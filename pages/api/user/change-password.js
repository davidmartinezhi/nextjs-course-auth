// /api/user/change-password
import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {
  //patch method
  if (req.method != "PATCH") {
    return;
  }

  //request comes from authenticated user
  const session = await getSession({ req: req }); //get session

  if (!session) {
    res.status(402).json({ message: "Not authenticated!" });
    return;
  }

  //extract data
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  //No user found
  if (!user) {
    res.status(404).json({ message: "User not found!" });
    client.close();
    return;
  }

  //verify password
  const currentPassword = user.password;
  const passwordsEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsEqual) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }

  //hash new password
  const hashedPassword = await hashPassword(newPassword);

  //replace password in db
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password updated!" });
}

export default handler;

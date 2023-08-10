import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

function handler(req, res) {
  //Extract incoming data
  const data = req.body;

  const { email, password } = data;

  //Validate incoming data
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid input - password should be at least 7 characters long",
    });
    return;
  }

  //connect to database
  const client = connectToDatabase();

  const db = client.db();

  //hash password
  const hashedPassword = hashPassword(password);

  db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Created user!" });
}

export default handler;

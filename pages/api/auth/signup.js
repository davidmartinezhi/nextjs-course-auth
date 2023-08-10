import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  //POST
  if (req.method === "POST") {
    //Extract incoming data
    const data = req.body;

    const { email, password } = data;

    //Validate incoming data

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          'Invalid input - password should also be at least 7 characters long.',
      });
      return;
    }

    //connect to database
    const client = await connectToDatabase();

    const db = client.db();  

    //hash password
    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Created user!" });
    client.close();

  }
}

export default handler;

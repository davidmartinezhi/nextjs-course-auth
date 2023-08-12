import NextAuth from "next-auth";
import Provider from "next-auth/providers";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    //credentials means we are going to use our own credentials
    Provider.Credentials({
      credentials: {
        //nextjs calls it for us when we get a login request
        async authorize(credentials) {
          //we get credentials like email, etc

          const client = await connectToDatabase();

          //check if we have a user
          const usersCollection = client.db().collection("users");

          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          //No user found
          if (!user) {
            throw new Error("No user found!");
          }

          //Check if password is correct
          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          //if password is not valid
          if (!isValid) {
            client.close();
            throw new Error("Could not log you in!");
          }

          client.close();
          return { email: user.email };

        },
      },
    }),
  ],
}); //we execute function and returns a handler function

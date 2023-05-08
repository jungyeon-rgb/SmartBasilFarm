import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "ID",
          type: "text",
          placeholder: "Enter your ID",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your Password",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (
          credentials.username === "testuser" &&
          credentials.password === "test"
        ) {
          const user = {
            id: 1,
            name: "test user",
            email: "testuser@example.com",
          };
          return user;
        }
        // Any object returned will be saved in `user` property of the JWT
        return null;

        // If you return null or false then the credentials will be rejected

        // You can also Reject this callback with an Error or with a URL:
        // throw new Error("error message") // Redirect to error page
        // throw "/path/to/redirect"        // Redirect to a URL
      },
    }),
  ],
  secret: process.env.SECRET,
});

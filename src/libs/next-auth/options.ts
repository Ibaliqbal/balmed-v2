import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUserLogin } from "../supabase/function";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      try {
        if (account?.provider === "google") {
          const checkUser = await getUserLogin(user.email);

          if (checkUser.status === false) {
            await createUser({
              email: user.email,
              name: user.name,
              photo: { url: user.image, path: "" },
              username: user.name?.replace(/\s/g, ""),
            });
          }
        }
      } catch (e) {
        throw new Error("Something went wrong in the authentication");
      }

      return token;
    },
    async session({ session, token }) {
      return session;
    },
    redirect(params) {
      return "/home";
    },
  },
  pages: {
    signIn: "/",
  },
};

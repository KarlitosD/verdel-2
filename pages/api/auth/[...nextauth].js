import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import { sequelize } from "/db";
import { User } from "/db/models";

export const authOptions = {
  adapter: SequelizeAdapter(sequelize, {
    models: { User },
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token, user }) {
      session = {
        ...session,
        user: {
          id: user.id,
          ...session.user,
        },
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);

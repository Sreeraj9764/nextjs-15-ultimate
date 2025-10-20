import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { api } from "./lib/api";
import { ActionResponse } from "../types/global";
import { IAccountDocument } from "./database/account.model";
import { SignInSchema } from "./lib/validations";
import { IUserDocument } from "./database/user.model";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const { data: existingAccount } =
            (await api.account.getByProviderAccountId(
              email
            )) as ActionResponse<IAccountDocument>;

          if (!existingAccount) return null;

          const { data: existingUser } = (await api.users.getById(
            existingAccount.userId.toString()
          )) as ActionResponse<IUserDocument>;

          if (!existingUser) return null;

          const isValidPassword = await bcrypt.compare(
            password,
            existingAccount.password!
          );
          if (isValidPassword) {
            return {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email,
              image: existingUser.image,
            };
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        const { data: existingAccount, success } =
          (await api.account.getByProviderAccountId(
            account.provider === "credentials"
              ? token.email!
              : account.providerAccountId
          )) as ActionResponse<IAccountDocument>;
        if (!success || !existingAccount) return token;
        const userId = existingAccount.userId;
        if (userId) token.sub = userId.toString();
      }
      return token;
    },

    async signIn({ user, profile, account }) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;

      const useInfo = {
        name: user.name!,
        email: user.email!,
        username:
          account.provider === "github"
            ? (profile?.login as string)
            : (user.name?.toLowerCase() as string),
        image: user.image!,
      };

      const response = (await api.auth.signInWithOauth({
        provider: account.provider as "google" | "github",
        providerAccountId: account.providerAccountId,
        user: useInfo,
      })) as ActionResponse;

      if (!response.success) return false;

      return true;
    },
  },
});

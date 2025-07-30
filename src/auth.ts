import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { api } from "./lib/api";
import { ActionResponse } from "../types/global";
import { IAccountDocument } from "./database/account.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        const { data: existingAccount, success } =
          (await api.account.getByProviderAccountId(
            account.provider === "credential"
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
      if (account?.provider === "credential") return true;
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

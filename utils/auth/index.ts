import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const config: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  basePath: "/api/auth",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized: async ({ request }) => {
      try {
        const { pathname } = request.nextUrl
        if (pathname === "/") return true
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token?.id && typeof token.id === "string") {
        session.user.id = token.id as string
      }
      return session
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)

import prisma from "@/prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter"


const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: {email: credentials.email}
        })

        if (!user) return null;

        if (user.hashedPassword === credentials.password) 
          return user;
        else
          return null;

      //   // ** I should use this logic but it doesn't work (don't know why) **
      //   const passwordsMatch = await bcrypt.compare(
      //     credentials.password, 
      //     user.hashedPassword
      //   );

      //   if (passwordsMatch) 
      //     return user;
      //   else
      //     return null;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  }
})

export { handler as GET, handler as POST };


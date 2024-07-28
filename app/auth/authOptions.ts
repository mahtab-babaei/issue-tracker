import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
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

        const passwordsMatch = await bcrypt.compare(
          credentials.password, 
          user.hashedPassword
        );

        return passwordsMatch ? user : null;
      }  
    })
  ],
  session: {
    strategy: 'jwt'
  }
}

export default authOptions;
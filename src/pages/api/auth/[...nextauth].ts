import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")

      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'enter email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('credentials', credentials);
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        console.log('user is', user);

        function compareAsync(param1: string, param2: string) {
          return new Promise(function (resolve, reject) {
            bcrypt.compare(param1, param2, function (err, res) {
              if (err) {
                reject(err);
              } else {
                resolve(res);
              }
            });
          });
        }
        if (user) {
          const res = await compareAsync(
            credentials?.password as string,
            user.password as string
          );
          console.log(res);
          if (res) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, user, token }) {
      session.role = token.role;
      return session;
    },
  },
  secret: process.env.SECRET,
});

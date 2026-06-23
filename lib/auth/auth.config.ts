import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

/**
 * NextAuth Configuration
 * For production, connect to a real database (PostgreSQL, MongoDB, etc.)
 */

// Mock user database - Replace with real database in production
const users = [
  {
    id: '1',
    email: 'admin@deeetodo.com',
    name: 'Admin DEEE TODO',
    password: '$2b$10$YourHashedPasswordHere', // bcrypt hash
    role: 'admin',
    discountPercentage: 0,
  },
  {
    id: '2',
    email: 'cliente@example.com',
    name: 'Cliente Ejemplo',
    password: '$2b$10$YourHashedPasswordHere',
    role: 'customer',
    discountPercentage: 10,
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Credenciales inválidas');
        }

        // Find user in database
        const user = users.find((u) => u.email === credentials.email);

        if (!user) {
          throw new Error('Usuario no encontrado');
        }

        // Verify password
        // In production, use: const isValid = await compare(credentials.password, user.password);
        const isValid = credentials.password === 'demo123'; // Demo password

        if (!isValid) {
          throw new Error('Contraseña incorrecta');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          discountPercentage: user.discountPercentage,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.discountPercentage = user.discountPercentage;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.discountPercentage = token.discountPercentage as number;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"]
    }
}

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: 'openid email profile' 
                  }
            }
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Gebruikersnaam", type: "text" },
                password: { label: "Wachtwoord", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Please provide both username and password");
                }
        
                const users = process.env.USERS;
                if (!users) {
                    throw new Error("Server configuration error: Users not configured");
                }
        
                const userPairs = users.split(',');
                const matchingPair = userPairs.find(pair => {
                    const [storedUsername, storedPassword] = pair.split(':');
                    return storedUsername === credentials.username && 
                           storedPassword === credentials.password;
                });
        
                if (matchingPair) {
                    const [username] = matchingPair.split(':');
                    return {
                        id: username,
                        name: username,
                        email: `${username}@example.com`,
                    };
                }
        
                throw new Error("Ongeldige gebruikersnaam of password");
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Voor credentials login
            if (account?.provider === 'credentials') {
                return true;
            }
    
            // Voor OAuth providers (Google, Facebook)
            if (account?.provider === 'google' || account?.provider === 'facebook') {
                if (profile?.email) {
                    const allowedEmails = process.env.EMAILS?.split(',').map(email => email.trim()) || [];
                    return allowedEmails.includes(profile.email);
                }
            }
    
            return false;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email;
                if (token.name) {
                    session.user.name = token.name;
                }
            }
            return session;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.email = profile.email;
                if (profile.name) {
                    token.name = profile.name;
                }
            }
            return token;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
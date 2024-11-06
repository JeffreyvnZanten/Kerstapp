import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

console.log("Environment check:");
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("USERS variable exists:", !!process.env.USERS);
console.log("Raw USERS value:", process.env.USERS);

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"]
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
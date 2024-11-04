// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { LoginCredentials, LoginResponse } from '@/app/types/auth';

export async function POST(request: Request) {
    try {
        const { username, password }: LoginCredentials = await request.json();
        
        // Changed NEXT_PUBLIC_USERS to USERS
        if (!process.env.USERS) {
            console.error('USERS not found in environment');
            return NextResponse.json<LoginResponse>({ 
                success: false,
                message: 'Authentication system not configured'
            }, { status: 500 });
        }

        const userPairs = process.env.USERS.split(',');
        const validCredentials = userPairs.map(pair => {
            const [user, pass] = pair.split(':');
            return { username: user, password: pass };
        });

        const matchingUser = validCredentials.find(
            cred => cred.username === username && cred.password === password
        );

        if (matchingUser) {
            return NextResponse.json<LoginResponse>({ 
                success: true,
                message: 'Login successful'
            });
        }

        return NextResponse.json<LoginResponse>({ 
            success: false,
            message: 'Invalid username or password'
        }, { status: 401 });

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json<LoginResponse>({ 
            success: false,
            message: 'Server error occurred'
        }, { status: 500 });
    }
}
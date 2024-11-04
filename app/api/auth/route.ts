// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { LoginCredentials, LoginResponse } from '@/app/types/auth';

export async function POST(request: Request) {
    console.log('API route hit'); // Debug log
    try {
        const { username, password }: LoginCredentials = await request.json();
        console.log('Received credentials for:', username); // Debug log
        
        if (!process.env.NEXT_PUBLIC_USERS) {
            console.error('NEXT_PUBLIC_USERS not found in environment'); // Debug log
            return NextResponse.json<LoginResponse>({ 
                success: false,
                message: 'Authentication system not configured'
            }, { status: 500 });
        }

        console.log('Checking credentials against:', process.env.NEXT_PUBLIC_USERS); // Debug log
        const userPairs = process.env.NEXT_PUBLIC_USERS.split(',');
        const validCredentials = userPairs.map(pair => {
            const [user, pass] = pair.split(':');
            return { username: user, password: pass };
        });

        const matchingUser = validCredentials.find(
            cred => cred.username === username && cred.password === password
        );

        if (matchingUser) {
            console.log('Login successful for:', username); // Debug log
            return NextResponse.json<LoginResponse>({ 
                success: true,
                message: 'Login successful'
            });
        }

        console.log('Login failed for:', username); // Debug log
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
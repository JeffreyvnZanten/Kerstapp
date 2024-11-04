// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { LoginCredentials, LoginResponse } from '@/app/types/auth';

export async function POST(request: Request) {
    try {
        const { username, password }: LoginCredentials = await request.json();
        
        // Debug log (will appear in server console)
        console.log('Login attempt for:', username);
        console.log('USERS env variable exists:', !!process.env.USERS);

        if (!process.env.USERS) {
            return NextResponse.json<LoginResponse>({ 
                success: false,
                message: 'Authentication system not configured'
            }, { status: 500 });
        }

        // Split into individual user:pass pairs
        const userPairs = process.env.USERS.split(',');
        const validCredentials = userPairs.map(pair => {
            const [user, pass] = pair.split(':');
            return { username: user, password: pass };
        });

        // Debug log
        console.log('Valid usernames:', validCredentials.map(c => c.username));

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
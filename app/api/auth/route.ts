// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { LoginCredentials } from '@/app/types/auth';

export async function POST(request: Request) {
    console.log('API route hit'); // Server-side log
    
    try {
        const { username, password }: LoginCredentials = await request.json();
        console.log('Login attempt for:', username); // Server-side log

        // Debug environment variable
        console.log('USERS env var exists:', !!process.env.USERS);
        
        if (!process.env.USERS) {
            console.log('USERS environment variable is missing'); // Server-side log
            return NextResponse.json({ 
                success: false,
                message: 'Authentication system not configured (USERS missing)',
                debug: 'env var missing'
            }, { status: 500 });
        }

        const userPairs = process.env.USERS.split(',');
        console.log('Found user pairs:', userPairs.length); // Server-side log

        const validCredentials = userPairs.map(pair => {
            const [user, pass] = pair.split(':');
            return { username: user, password: pass };
        });

        const matchingUser = validCredentials.find(
            cred => cred.username === username && cred.password === password
        );

        if (matchingUser) {
            console.log('Login successful for:', username); // Server-side log
            return NextResponse.json({ 
                success: true,
                message: 'Welkom ${username}'
            });
        }

        console.log('Login failed for:', username); // Server-side log
        return NextResponse.json({ 
            success: false,
            message: 'Invalid username or password',
            debug: 'credentials did not match'
        }, { status: 401 });

    } catch (error) {
        console.error('Server error:', error); // Server-side log
        return NextResponse.json({ 
            success: false,
            message: 'Server error occurred',
            debug: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
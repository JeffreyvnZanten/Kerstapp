import React from "react";
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function FacebookLogin() {
    const [debugInfo, setDebugInfo] = useState<string>('');

    const handleFacebookSignIn = async () => {
        setDebugInfo('Attempting Facebook sign in...');
        try {
            await signIn('facebook', { callbackUrl: '/' });
        } catch (error) {
            setDebugInfo(`Error during Facebook sign in: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    return (
        <button 
            onClick={handleFacebookSignIn}
            className="bg-[#1877F2] hover:bg-[#166FE5] text-white px-8 py-3 rounded-lg w-full max-w-xs font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
        >
            Inloggen met Facebook
        </button>
    );
}
import React from "react";
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function GoogleLogin() {
    const [debugInfo, setDebugInfo] = useState<string>('')

    const handleGoogleSignIn = async () => {
        setDebugInfo('Attempting Google sign in...')
        try {
          await signIn('google', { callbackUrl: '/' })
        } catch (error) {
          setDebugInfo(`Error during Google sign in: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    return(
        <button 
            onClick={handleGoogleSignIn}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg w-full max-w-xs font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
        >
        Inloggen met Google
        </button>
    );
}
import React from "react";
import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

export default function CredentialsLogin() {
    const { data: session } = useSession()
    const [debugInfo, setDebugInfo] = useState<string>('')
    const [credentials, setCredentials] = useState({
      username: '',
      password: ''
    })

    const handleCredentialsLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      setDebugInfo('Attempting credentials login...')
      
      try {
          const result = await signIn('credentials', {
              username: credentials.username,
              password: credentials.password,
              redirect: false,
          })
          
          if (result?.error) {
              setDebugInfo(`Login mislukt: ${result.error}`)
          } else {
              setDebugInfo('Login successful!')
          }
      } catch (error) {
          setDebugInfo(`Error during login: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
  }

    // Log session info wanneer het verandert
    React.useEffect(() => {
        if (session) {
            console.log('Current session:', session)
        }
    }, [session])

    return (
        <form onSubmit={handleCredentialsLogin} className="w-full max-w-xs space-y-4">
            <input
                type="text"
                placeholder="Gebruikersnaam"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
            />
            <input
                type="password"
                placeholder="Wachtwoord"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
            />
            <button 
                type="submit"
                className="bg-red-800 text-white px-8 py-3 rounded-lg w-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
                Inloggen
            </button>
            {debugInfo &&         
              <div className="bg-gray-800 text-white p-3 rounded-md text-sm mt-4 w-full max-w-xs">
                {debugInfo}
              </div>
            }
        </form>
    );
}
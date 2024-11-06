'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import CredentialsLogin from './CredentialsLogin'
import DividerAuth from './DividerAuth'
import GoogleLogin from './GoogleLogin'

export default function LoginForm() {
  const { data: session, status } = useSession()
  const [debugInfo, setDebugInfo] = useState<string>('')

  // Voeg meer specifieke status informatie toe
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <p>Status: {status}</p>
        <p>Laden van sessie...</p>
      </div>
    )
  }

  // Log de sessie status
  console.log("Session status:", status);
  console.log("Session data:", session);

  return (
    <div className="space-y-4 mt-6 flex flex-col items-center">
      <div className="text-sm text-gray-500">
        Huidige status: {status}
      </div>
      
      <CredentialsLogin />
      <DividerAuth />
      <GoogleLogin />

      {debugInfo && (
        <div className="bg-gray-800 text-white p-3 rounded-md text-sm mt-4 w-full max-w-xs">
          {debugInfo}
        </div>
      )}
    </div>
  )
}
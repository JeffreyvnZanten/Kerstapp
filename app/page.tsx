// app/page.tsx
'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import ChristmasCountdown from './ChristmasCountdown'
import Snowfall from 'react-snowfall'
import LoginForm from './LoginForm'
import Logout from './Logout'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  if (session) {
    return (
      <div className="bg-[url('/xmas3.webp')] bg-cover bg-center bg-no-repeat min-h-screen w-full fixed inset-0">
        <Snowfall 
          snowflakeCount={200}
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            zIndex: 1
          }}
        />
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
          <div className="overlay-bg p-8 rounded-xl backdrop-blur-sm shadow-lg">
            <ChristmasCountdown />
            <Logout />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[url('/xmas3.webp')] bg-cover bg-center bg-no-repeat min-h-screen w-full fixed inset-0">
      <Snowfall 
        snowflakeCount={200}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 1
        }}
      />
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
        <div className="overlay-bg p-8 rounded-xl backdrop-blur-sm shadow-lg">
          <ChristmasCountdown />
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
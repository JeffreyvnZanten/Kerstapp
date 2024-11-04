'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import ChristmasCountdown from './ChristmasCountdown'
// import Snowfall from 'react-snowfall'

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
        {/* <Snowfall 
          snowflakeCount={200}
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            zIndex: 1
          }}
        /> */}
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
          <div className="bg-white/80 p-8 rounded-xl backdrop-blur-sm shadow-lg">
            <ChristmasCountdown />
            <div className="text-center mt-4 text-gray-800">Welcome, {session.user?.email}</div>
            <button 
              onClick={() => signOut()}
              className="bg-christmas-red hover:bg-red-800 text-white px-8 py-3 rounded-lg w-full max-w-xs font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 mt-4"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[url('/xmas3.webp')] bg-cover bg-center bg-no-repeat min-h-screen w-full fixed inset-0">
      {/* <Snowfall 
        snowflakeCount={200}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 1
        }}
      /> */}
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
        <div className="bg-white/80 p-8 rounded-xl backdrop-blur-sm shadow-lg">
          <ChristmasCountdown />
          <div className="text-center mt-4 text-gray-800">Not signed in</div>
          <div className="space-y-4 mt-6 flex flex-col items-center"> {/* Added flex flex-col items-center */}            <button 
              onClick={() => signIn('google')}
              className="bg-red-800 text-white px-8 py-3 rounded-lg w-full max-w-xs font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Sign in with Google
            </button>
            <button 
              onClick={() => signIn('facebook')}
              className="bg-red-800 text-white px-8 py-3 rounded-lg w-full max-w-xs font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Sign in with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
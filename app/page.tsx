// app/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import ChristmasCountdown from './components/ChristmasCountdown'
import LoginForm from './LoginForm'
import NameDrawingEvent from './components/NameDrawingEvent'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return "Loading..."
  }

  if (session) {
    return (
      <div className="overlay-bg p-4 rounded-xl backdrop-blur-sm shadow-lg">
        <NameDrawingEvent />
      </div>
    )
  }

  return (
    <div className="overlay-bg p-4 rounded-xl backdrop-blur-sm shadow-lg">
      <ChristmasCountdown />
      <LoginForm />
    </div>
  )
}
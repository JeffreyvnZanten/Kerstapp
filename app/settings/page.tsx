'use client'

import { useSession, signOut } from 'next-auth/react'

export default function SettingsPage() {
    return (
        <div className="overlay-bg p-8 rounded-xl backdrop-blur-sm shadow-lg">
            <div className="text-3xl text-white font-bold mb-4">
                Instellingen
            </div>
            <button 
                    onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                    className="bg-red-800 text-white px-4 py-2 max-w-xs font-semibold"
            >
                Uitloggen
            </button>
        </div>
    )
}
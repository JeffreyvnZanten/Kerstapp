import React from "react";      
import { useSession, signOut } from 'next-auth/react'

export default function Logout() {
    const { data: session, status } = useSession()

    if(session) {
        return (
            <div className="space-y-4 mt-6 flex flex-col items-center">
            <div className="text-center text-white">
                Welkom, {session.user?.name || session.user?.email}
            </div>
            <button 
                onClick={() => signOut({ redirect: false })}
                className="bg-christmas-red hover:bg-red-800 text-white px-8 py-3 rounded-lg w-full max-w-xs font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
                Uitloggen
            </button>
            </div>
        );
    }
}
      
      

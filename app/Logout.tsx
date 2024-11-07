import React from "react";      
import { useSession, signOut } from 'next-auth/react'

export default function Logout() {
    const { data: session, status } = useSession()

    if(session) {
        return (
            <div className="space-y-4 mt-6 flex flex-row items-center">
                <div className="text-center text-white">
                    Welkom, {session.user?.name || session.user?.email}
                </div>
                <button 
                    onClick={() => signOut({ redirect: false })}
                    className="text-white px-4 py-2 max-w-xs font-semibold"
                >
                    Uitloggen
                </button>
            </div>
        );
    }
}
      
      

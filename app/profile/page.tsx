'use client'

import { useSession, signOut } from 'next-auth/react'

export default function ProfilePage() {
    const { data: session } = useSession()

    if(session)
    return (
        <div className="overlay-bg p-8 rounded-xl backdrop-blur-sm shadow-lg">
            <div className="text-3xl text-white font-bold mb-4">
                Profiel pagina
            </div>
            <p className='text-white'>Naam: {session.user?.name}</p>
            <br />
            <ul className="text-white">Interesses
                <li>* Technologie</li>
                <li>* Gezondheid</li>
                <li>* Gamen</li>
            </ul>
            <button className="bg-red-800 text-white px-8 py-3 my-4 space-y-4 rounded-lg w-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"            >
                Voeg toe
            </button>
            <ul className="text-white">Laatste bezigheden
                <li>* Android app voor supplementen</li>
                <li>* Kerstloting digitale versie</li>
            </ul>
            <button className="bg-red-800 text-white px-8 py-3 my-4 space-y-4 rounded-lg w-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"            >
                Voeg toe
            </button>
        </div>
    )
}
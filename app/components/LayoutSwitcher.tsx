// components/DevNavigationToggle.tsx
'use client'
import { useState } from "react";
import BottomNav from "./BottomNav";
import PersonalMenu from "./PersonalMenu";
import { useSession } from "next-auth/react";

export default function LayoutSwitcher() {
    const [navigationStyle, setNavigationStyle] = useState<'bottom' | 'personal'>('bottom');
    const { data: session } = useSession()

    if(session)
    return (
        <>
            <div className="fixed bottom-20 right-4 flex gap-2 z-50">
                <button 
                    onClick={() => setNavigationStyle('bottom')}
                    className={`px-4 py-2 rounded ${
                        navigationStyle === 'bottom' 
                            ? 'bg-red-800 text-white' 
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    1
                </button>
                <button 
                    onClick={() => setNavigationStyle('personal')}
                    className={`px-4 py-2 rounded ${
                        navigationStyle === 'personal' 
                            ? 'bg-red-800 text-white' 
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    2
                </button>
            </div>

            {navigationStyle === 'bottom' && <BottomNav />}
            {navigationStyle === 'personal' && <PersonalMenu />}
        </>
    )
}
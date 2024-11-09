'use client'

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function PersonalMenu() {
    const { data: session } = useSession()
    
    if (session) {
        return (
            <div className="bg-black/95 rounded-xl fixed bottom-0 left-1/2 -translate-x-1/2 w-4/5 p-3 bottom-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button>
                            <Image 
                                src="/icons/default_avatar2.svg"
                                alt="Avatar"
                                width={36}
                                height={36}
                                className="w-10 h-10"
                            />
                        </button>
                        <p className="text-white">{session?.user?.name?.split(' ')[0]}</p>
                    </div>
                    <Image 
                        src="/icons/settings.svg"
                        alt="Instellingen"
                        width={24}
                        height={24}
                        className="w-7 h-7 opacity-70"
                    />
                </div>
            </div>
        )
    }
}
'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function BottomNav() {
   const pathname = usePathname();

   return (
       <div className="fixed bottom-0 left-0 right-0 md:hidden bg-black/95 p-4">
           <div className="flex flex-row justify-evenly items-center">
               <Link href="/" className="flex flex-col items-center gap-1">
                   <Image 
                       src="/icons/home.svg"
                       alt="Home"
                       width={24}
                       height={24}
                       className={`w-6 h-6 ${pathname === "/" ? "brightness-200" : "opacity-40"}`}
                   />
                   <span className={`text-xs ${pathname === "/" ? "text-white" : "text-gray-400"}`}>
                       Home
                   </span>
               </Link>
               <Link href="/profile" className="flex flex-col items-center gap-1">
                   <Image 
                       src="/icons/profile.svg"
                       alt="Profiel"
                       width={24}
                       height={24}
                       className={`w-6 h-6 ${pathname === "/profile" ? "brightness-200" : "opacity-40"}`}
                   />
                   <span className={`text-xs ${pathname === "/profile" ? "text-white" : "text-gray-400"}`}>
                       Profiel
                   </span>
               </Link>
               <Link href="/settings" className="flex flex-col items-center gap-1">
                   <Image 
                       src="/icons/settings.svg"
                       alt="Instellingen"
                       width={24}
                       height={24}
                       className={`w-6 h-6 ${pathname === "/settings" ? "brightness-200" : "opacity-40"}`}
                   />
                   <span className={`text-xs ${pathname === "/settings" ? "text-white" : "text-gray-400"}`}>
                       Instellingen
                   </span>
               </Link>
           </div>
       </div>
   )
}
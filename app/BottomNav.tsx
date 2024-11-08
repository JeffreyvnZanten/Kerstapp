import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function BottomNav() {
    return (
        <div className="fixed bottom-0 left-0 right-0 md:hidden overlay-bg backdrop-blur-sm p-4">
            <div className="flex flex-row text-white justify-evenly items-center">
                <Link href={"/"}>
                    <Image 
                            src="/icons/home.svg"
                            alt="Home"
                            width={36}
                            height={36}
                            className="w-6 h-6 invert"
                    />
                </Link>
                <Link href={"/"}>
                    <Image 
                            src="/icons/profile.svg"
                            alt="Home"
                            width={36}
                            height={36}
                            className="w-7 h-7"
                    />
                </Link>
            </div>
        </div>
    )
}
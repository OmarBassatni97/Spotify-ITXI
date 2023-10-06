'use client'

import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsSpotify } from 'react-icons/bs'
import { useRouter } from "next/navigation";
export default function Login() {
    const session = useSession();
    const router = useRouter()
    console.log(session);
    const handleSignIn = async () => {
        await signIn("spotify", { callbackUrl: "/search" });
    };
    useEffect(() => {
        session?.data && router.push('/search', { scroll: false })
    }, [session])
    return (
        <div className="w-full flex items-center justify-center h-screen">
            {!session?.data && (
                <span
                    className="border flex items-center justify-between w-[100px] p-2 cursor-pointer hover:bg-green-500 duration-200"
                    onClick={handleSignIn}
                >
                    Login
                    <BsSpotify color="green" />
                </span>
            )}
        </div>
    );
}
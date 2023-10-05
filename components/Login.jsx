"use client"

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
    const session = useSession()
console.log(session.data);
    return (
        <div className="w-full flex items-center justify-center h-screen">
            {!session?.data ?
                <span className="border p-2 cursor-pointer hover:bg-green-500 duration-200" onClick={
                    () => signIn()
                }> Sign in with Spotify </span>
                :
                <span className="border p-2 cursor-pointer hover:bg-green-500 duration-200" onClick={
                    () => signOut()
                }> Sign out </span>
            }
        </div>
    )
}
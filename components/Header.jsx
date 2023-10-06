'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const Header = () => {
    const { data: session } = useSession()
    return (
        session &&
        <div className='w-full flex justify-between p-4'>
            <span className='text-2xl font-bold'>Welcome {session?.user?.name}</span>

            <div className='border p-2 cursor-pointer' onClick={() => signOut()}>
                Sign out
            </div>
        </div>
    )
}

export default Header
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import logout from '@/utils/logout'

const Navbar = () => {
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    return (
        <div className='flex items-center justify-between w-full p-2 '>
            <div>
                <h1 className='pl-2 pr-2 text-2xl font-bold'>Task Tracker</h1>
            </div>
            <Button onClick={handleLogout} variant="outline">
                Logout
            </Button>
        </div>
    )
}

export default Navbar
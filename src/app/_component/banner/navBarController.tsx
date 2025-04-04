'use client'
import { GlobalContext } from '@/app/util/globalcontext/globalecontext'
import { useContext, useEffect } from 'react'

function NavBarController({ children }: { children: React.ReactNode }) {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error('NavBarController in banner : Non Disponible')
    }
    const { setToggelNav } = context

    useEffect(() => {
        const timer = setTimeout(() => {

            setToggelNav(false)
        }, 1)

        return () => clearTimeout(timer)

    }, [setToggelNav])


    return <>{children}</>
}

export default NavBarController

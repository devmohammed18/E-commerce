'use client'
import { GlobalContext } from '@/app/util/globalcontext/globalecontext'
import { useContext, useEffect } from 'react'

function NavBarController({children}:{children:React.ReactNode}) {
    const context=useContext(GlobalContext)
    if(!context) {
        throw new Error ('NavBarController:GlobleContext non disponible')
    }

    const {setToggelSub}=context
    useEffect(()=>{
     

       console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
      const timer=setTimeout(() => {
      
        setToggelSub(true)
       
      }, 1);

      return ()=>clearTimeout(timer)

    },[setToggelSub])


  return <>{children}</>
}

export default NavBarController

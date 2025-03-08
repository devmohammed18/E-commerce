'use client'
import { GlobalContext } from '@/app/util/globalcontext/globalecontext'
import { useContext, useEffect } from 'react'

function ComposentNavBarController({children}:{children:React.ReactNode}) {
    const context=useContext(GlobalContext)
    if(!context) {
        throw new Error ('NavBarController:GlobleContext non disponible')
    }

    const {setToggelNav,setToggelSub}=context
    useEffect(()=>{
     

       console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
      const timer=setTimeout(() => {
      //  context.setShowCart(false)
        //setToggelNav(false)
        setToggelSub(true)
       
      }, 1);

      return ()=>clearTimeout(timer)

    },[setToggelNav,setToggelSub])


  return <>{children}</>
}

export default ComposentNavBarController

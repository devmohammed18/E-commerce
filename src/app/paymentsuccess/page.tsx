'use client'

import { useUser } from '@clerk/nextjs'
import { MdDone } from "react-icons/md";
import { useRouter } from 'next/navigation';

 function PaymentSuccess() {
  const {user}=useUser()
  const route=useRouter()
    console.log('user========>',user?.fullName)
   
   return (
        <div className='z-[100] absolute top-0 right-0 left-0 bottom-0  flex  justify-center items-center   bg-[var(--secondary-color)] capitalize ' >
         
                <div className='w-3/4 h-3/4 text-center space-y-6 border-0 border-sold  border-red-800'>
                   
                    <div className='w-14 h-14 border-2 mx-auto flex justify-center items-center border-solid border-[var(--pramiry-color)] rounded-full' >
                      <span className='text-4xl text-green-600 font-bold'><MdDone /></span> 
                    </div>
                    <h1 className='text-xl font-bold'>payemnt successful !</h1> 
                    <h1 className='text-md text-slate-600'>we sent an email with your order confirmation along with digital content</h1>
                    <button className=' py-2 px-4 rounded-md bg-green-600 text-[var(--secondary-color)] capitalize '
                       onClick={()=>route.push(`${process.env.NEXT_PUBLIC_URLL}`)}      >go to home</button>

                   

               </div>   

        </div>
    )
}

export default PaymentSuccess

'use client'

import { PaymentElement } from '@stripe/react-stripe-js'
import { Dispatch, SetStateAction } from 'react'


interface typeModePaiement{
    modePaiement:string,
    setModePaiement:Dispatch<SetStateAction<string>>,
  
}

function ModePaiement({modePaiement,setModePaiement}:typeModePaiement) {



const modePaimentOnchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {value}=e.target
    setModePaiement(value)

 }

  return (
    <div className={`w-full  box-border px-2 py-2  gap-3 rounded-md flex flex-col items-start border-0 border-solid border-gray-400`}
    // style={{
    //   height: modePaiement === 'credit' ? '24rem' : '100%', // '20rem' correspond à h-80 (taille par défaut de Tailwind)
    // }}
    >
       <label className='text-md capitalize pb-1 border-b-2 border-solid border-b-gray-600' > paiement mode :</label>

        <div className='flex justify-start items-center gap-5 capitalize'>
           <input onChange={modePaimentOnchange}  type='radio' value='cash' checked={modePaiement==='cash'}  />
           <label>paiement cash</label>
        </div>   
        <div className='flex justify-start items-center gap-5'>
           <input onChange={modePaimentOnchange} type='radio' value='credit' checked={modePaiement==='credit'}  />
           <label>paiement by credit</label>
        </div>  
            {/*   modePaiement === 'credit' &&   ${modePaiement === 'credit' ? 'opacity-100' : 'opacity-0 pointer-events-none'} */}
            
            {/* {modePaiement==='credit' &&  
            <div className={`w-full h-96  box-border border-0 border-solid border-gray-600 transition-opacity  ${modePaiement === 'credit' ? 'block' : 'hidden'}  `}>
         
               <PaymentElement />
      
            </div>} */}
       
        
        {modePaiement==='credit'? 
         <div className='w-full  box-border border-0 border-solid border-gray-600' >
           <PaymentElement />  
           </div>
         :''}

    </div>
  )
}

export default ModePaiement

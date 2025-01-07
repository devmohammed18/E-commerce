
'use client'
import { GlobalContext } from '@/app/util/globalcontext/globalecontext'

import { incrementCart,decrementCart } from '@/app/util/redux/reduce';
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux';
import { typeBtnCounterQuantity } from '@/app/util/type/type';




function BtnCounterQuantity({width,height,id,title_pro,desc_pro,images,priceCart,sizeCart,quantityCart}:typeBtnCounterQuantity) {


const dispatch=useDispatch() ;
const context=useContext(GlobalContext);
  if(!context){
    throw new Error('GlobalContext be mutch within GlobalContextProvider')
  }

  const {setDisCounterQuantite,disCounterQuantity}=context

//function decrement quantite the cart

const handlerDecrementCart=()=>{

  if(quantityCart>=1){ 
    setDisCounterQuantite(false) 
    dispatch(decrementCart({
    id:id,
    title_pro:title_pro,
    desc_pro,
    images:images,
    sizeCart:sizeCart,
    priceCart:priceCart,
    quantityCart:quantityCart,
}))
 
 
}//end if


}
 //function increment Quantity the Cart
const handlerImcrementCart=()=>{
  if(quantityCart<10){
    
    dispatch(incrementCart({
    id:id,
    title_pro:title_pro,
    desc_pro:desc_pro,
    images:images,
    priceCart:priceCart,
    sizeCart:sizeCart,
    quantityCart:quantityCart

}))

}
else {
  setDisCounterQuantite(true)    
}

}

  return (
    <div className=' flex items-center justify-center border-2 border-solid border-gray-600 rounded-full '>
        {/* ****************Button Plus( + )  ************* */}
                                        
                                          <button  
                                          style={{width:`${width}px` , height:`${height}px` }}
                                          className=' rounded-full border-0 border-solid flex justify-center items-center border-blue-500 hover:bg-slate-400 '
                                              disabled={disCounterQuantity}
                                                  onClick={()=> {handlerImcrementCart()} }
                                                
                                          >+</button>
                                          
                                          {/* ******************* Input  ******************** */}
                                          <input 
                                          style={{width:`${width}px`, height:`${height}px`}}
                                          className='text-center' disabled 
                                          value={quantityCart} />
        
                                          {/* ***************Button Moin( - ) *****************/}
                                          <button 
                                           style={{width:`${width}px`, height:`${height}px`}}
                                            className='rounded-full border-0 border-solid flex justify-center items-center border-blue-500 hover:bg-slate-400 '
                                            onClick={()=> { handlerDecrementCart()}
                                        } 
                                          
                                         >
                                          {quantityCart>1?
                                          (<span>-</span>)
                                          :(<svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="size-4"
                                          >
                                          <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                          />
                                          </svg>
                                       ) }
                                          </button>


    </div>
  )
}

export default BtnCounterQuantity

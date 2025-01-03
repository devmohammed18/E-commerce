'use client'

import { RootState } from '@/app/util/redux/strore'
import { ToggelHeaderContext } from '@/app/util/hooks/toggelHeaderContext'

import React, { useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { decrementCart, getTotalsQuantity, incrementCart } from '@/app/util/redux/reduce'




function MenuCart() {
  
  const {products,totalQuantityCart}=useSelector((state:RootState)=>state.cart)
  const dispatch=useDispatch()
  console.log(products)
 
 const context=useContext(ToggelHeaderContext)
   if(!context){
    throw new Error('verfier ToggleHeaderContext') }
    const {setShowCart,showCart}=context;

// const incrementCart=()=>{
//     dispatch(incrementCart({
//         id:id,
//         title_pro:title_pro,
//         desc_pro:desc_pro,
//         images:images,
//         priceCart:priceCart,
//         sizeCart:sizeCart,
//         quantityCart:quantityCart,
//     }))

// }

  useEffect(()=>{
    dispatch(getTotalsQuantity())
  },[products])

// 
  return (
    <div className={`sm:w-full h-[calc(100%-80px)]  sm:top-[80px] md:w-full md:top-[80px] 
                fixed top-[80px]  box-border  flex justify-center  ${showCart?'right-0':'-right-[1000px]' } transition-all ease-linear duration-500 border-2 border-solid border-gray-600`} >
        
       <div className="sm:max-w-full h-full overflow-auto md:max-w-full z-40 relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8  lg:px-8"
            aria-modal="true"
            role="dialog"
            // tabIndex="-1"
             >

        {/*****************  Button Close the cart  *********************/}
            <button onClick={()=>setShowCart(false)}
                    className="absolute end-4 top-2 left-5 text-gray-600 transition hover:scale-110">
                <span  className="sr-only">Close cart</span>

                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>



           {products.length===0?
            <div className="mt-4 space-y-6 text-center   border-2 border-solid border-red-800 capitalize ">
                <h1 >basket is empty</h1>
            </div>
            
            :<div className="mt-4 space-y-6   border-2 border-solid border-red-800 ">
                <ul className="space-y-4">

                    {products.map(({id,title_pro,desc_pro,images,sizeCart,priceCart,quantityCart},index:number)=>(
                        <li key={index} className="flex items-center gap-4">
                        <div className='w-14 h-16'>
                            <Image
                            src={images[0].url_image[0].url}
                            alt="image"
                            width={80}
                            height={80}
                            className="w-full h-full rounded object-cover"
                            />
                        </div>
                        <div>
                        <h3 className="text-sm text-gray-900">{title_pro}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">{sizeCart}</dd>
                            </div>

                            <div>
                            <dt className="inline">Price:</dt>
                            <dd className="inline">{images[0].price}</dd>
                            </div>
                        </dl>
                        </div>
                            
                        

                        <div className="flex flex-1 items-center justify-end gap-2">
                        
                        {/***************************Counter the Quantite *****************************  */}
                        <div className='w-[86px] h-[29px] rounded-full flex justify-center items-center  border-2 border-solid border-gray-400 '>
                            {/* ****************Button Plus( + )  ************* */}
                           
                            <button  className='w-[29px]  h-[29px] rounded-full border-0 border-solid flex justify-center items-center border-blue-500 hover:bg-slate-400 '
                                
                                    onClick={() =>{ 
                                        dispatch(incrementCart({
                                        id:id,
                                        title_pro:title_pro,
                                        desc_pro:desc_pro,
                                        images:images,
                                        priceCart:priceCart,
                                        sizeCart:sizeCart,
                                        quantityCart:quantityCart
                                    }))
                                }}
                            >+</button>
                            
                            {/* ******************* Input  ******************** */}
                            <input className='w-[27px] h-[29px] text-center' disabled 
                            value={quantityCart} />

                            {/* ***************Button Moin( - ) *****************/}
                            <button onClick={()=>{dispatch(decrementCart({
                                id:id,
                                title_pro:title_pro,
                                desc_pro,
                                images:images,
                                sizeCart:sizeCart,
                                priceCart:priceCart,
                                quantityCart:quantityCart,
                            }))}} 
                            
                            className='w-[29px] h-[29px] rounded-full border-0 border-solid flex justify-center items-center border-blue-500 hover:bg-slate-400 '>
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
                            </svg>)}
                            </button>
                        </div>
                        
                        </div>
                        </li>
                    )) }


                </ul>

                <div className="space-y-4 text-center">
                <Link
                    href="/cart"
                    className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
                    onClick={()=>{ setShowCart(false)}}              
                >
                    View my cart ({totalQuantityCart})
                </Link>

                {/* <button
                   
                    className="w-full rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
                    onClick={()=>{  setShowCart(false)}}              
                >
                    View my cart ({totalQuantityCart})
                </button> */}

                <Link
                    href="#"
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                    Checkout
                </Link>

                <Link
                    href="#"
                    className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
                >
                    Continue shopping
                </Link>
                </div>
            </div>}
        </div>

    </div>
  )
}

export default MenuCart

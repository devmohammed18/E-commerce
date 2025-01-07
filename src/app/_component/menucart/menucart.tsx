'use client'

import { RootState } from '@/app/util/redux/strore'
import React, { useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { getTotalsQuantity } from '@/app/util/redux/reduce'
import { GlobalContext } from '@/app/util/globalcontext/globalecontext'
import BtnCounterQuantity from '../btncounterquantity/btncounterquantity'




function MenuCart() {
  
  const {products,totalQuantityCart}=useSelector((state:RootState)=>state.cart)
  const dispatch=useDispatch()
  console.log(products)
 
 const context=useContext(GlobalContext)
   if(!context){
    throw new Error('GlobalContext must be used within a GlobalContextProvider') }
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
            
            :<div className="mt-4 space-y-6   border-0 border-solid border-red-800 ">
                <ul className="space-y-4">

                    {products.map(({id,title_pro,desc_pro,images,sizeCart,priceCart,quantityCart},index:number)=>(
                        <li key={index} className="flex items-center gap-4">
                        <div className='w-14 h-16'>
                            <Image
                            src={images[0]?.url_image[0]?.url}
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
                            <dd className="inline">{images[0]?.price}</dd>
                            </div>
                        </dl>
                        </div>
                            
                        
                        {/***************************Counter the Quantite *****************************  */}
                        <div className="w-max rounded-full ">
                          <BtnCounterQuantity width={29} height={29} id={id} title_pro={title_pro} desc_pro={desc_pro} images={images} priceCart={priceCart} sizeCart={sizeCart} quantityCart={quantityCart} />
                        </div>

                        </li>
                    )) }


                </ul>

                <div className="space-y-4 text-center">
                <Link
                    href="/cart"
                    className="block rounded border border-gray-600 bg-gray-600 px-5 py-3 text-sm text-white transition hover:ring-1 hover:ring-gray-400"
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

                {/* <Link
                    href="/checkout"
                    className=" block w-full rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                    Checkout
                </Link> */}

                <Link
                    href="/"
                    onClick={()=>setShowCart(false)}
                    //className=" block w-full rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    className="inline-block text-sm  text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
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

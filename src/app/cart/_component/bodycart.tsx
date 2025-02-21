
'use client'
import React, {useEffect,useContext} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { RootState } from '@/app/util/redux/strore'
import {getTotalsAmount, getTotalsQuantity } from '../../util/redux/reduce'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { GlobalContext } from '@/app/util/globalcontext/globalecontext'
import BtncounterQuantity from '@/app/_component/btncounterquantity/btncounterquantity'



function BodyCart() {



  const router= useRouter()
  const {user}=useUser()
  const {products,totalAmountCart,totalQuantityCart}=useSelector((state:RootState)=>state.cart)
  const dispatch=useDispatch()
  const context=useContext(GlobalContext)
  if(!context){
    throw new Error('GlobalContext be mutch within GlobalContextProvider')
  }

  const {setDisableFaShoppingCart}=context
  


  const handleCheckOut=()=>{
      
     if(!user) {
        setDisableFaShoppingCart(false)
        router.push('/sign-in')
     }else{
        setDisableFaShoppingCart(true)
        router.push('/checkout')

      //router.push(`/checkout?amount=${amount}`)
     }
    

  }

  const handleCheckOutCash=()=>{
      
    if(!user) {
   
       router.push('/sign-in')
    }else{
      
       router.push("/checkoutcash")

     //router.push(`/checkout?amount=${amount}`)
    }
   

 }
 
  // const totalAmountCart = products.reduce((acc, product) => acc + (product.quantityCart * product.priceCart), 0);
  // const totalQuantityCart = products.reduce((acc, product) => acc + product.quantityCart, 0);


  useEffect(()=>{
    dispatch(getTotalsAmount())
    dispatch(getTotalsQuantity())
  },[products])
  console.log(products)

//   if(!user){
//     return router.push('/sign-in')
//   }
//  if(user){
//   return  router.push('/checkout') 
//  }
  

  
  return (
    
    <div className='w-full min-h-screen flex-col border-2 border-solid border-red-800 justify-center items-center py-1 space-y-1 mt-[85px] mb-1 bg-[var(--secondary-color)]' >
    
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">My Shopping Cart({totalQuantityCart})</h1>
            </header>

           
              
{/* *************************************************** */}
{products.length===0? 
           <h1 className='text-center'> basket is empty </h1>
           :<div className="mt-8">

            {/*************************** information the Cart *****8*********************/}
              <ul className="space-y-4 border-0 boredr-solid border-red-700">
               
                { products && products.map(({id,title_pro,desc_pro,sizeCart,images,priceCart,quantityCart },index:number)=>(
                   
                   <div key={index}  className='flex-col justify-between items-start gap-3 border-0 border-solid border-red-700 ' >
                      <li className="flex items-start gap-4">
               {/**************************** image the product ***********************/}
                      <div className='w-40 h-44'>
                        <Image
                          src={images[0].url_image[0].url}
                          height={100}
                          width={100}
                          alt=""
                          // size-16
                          className="w-full h-full rounded object-cover"
                        />
                      </div>

               {/***************************** information the product ********************/}
                      <div className=' space-y-5 border-0 border-solid border-red-700' >
                          {/*                      title the product              */}
                          <h3 className="text-2xl  text-gray-900">{title_pro}</h3>
                          {/*     size and price and Quantity the product            */}
                          <dl className="text-lg mt-0.5 space-y-2  text-gray-600 ">
                              
                              <div >
                                <dt className="inline">Size:</dt>
                                <dd className="inline">{sizeCart}</dd>
                              </div>

                              <div>
                                <dt className="inline">Price:</dt>
                                <dd className="inline">${images[0].price}</dd>
                              </div>
                              
                                {/******************************  Button Couter Quantity  ***********************/}
                              
                              <div className='w-max'>
                                 <BtncounterQuantity width={35} height={30} id={id} title_pro={title_pro} desc_pro={desc_pro} images={images} priceCart={priceCart} sizeCart={sizeCart} quantityCart={quantityCart} />
                              </div>


                          </dl>
                      </div>
                    
                      {/*                    totals amount for each Product            */}
                      <div className="flex flex-1 items-center justify-end gap-2">
                       
                        <span className='w-7 text-lg font-semibold border-b-2 border-solid border-black ' >
                          ${quantityCart*images[0].price}
                        </span>

                      </div>
                       
                       

                      </li>
                      {/***************************Counter the Quantite *****************************  */}
                      

                    </div>

                )) }

              </ul>

             {/****************************Total Amount the Cart ********************************/}
              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-lg font-semibold text-gray-700">
                    <div className="flex justify-between">
                      <dt >Subtotal</dt>
                      <dd>${totalAmountCart}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>VAT</dt>
                      <dd>0</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Discount</dt>
                      <dd>0</dd>
                    </div>
                     
                    <div className="flex justify-between text-lg font-semibold">
                      <dt>Total</dt>
                      <dd>{totalAmountCart}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <span
                      className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>

                      <p className="whitespace-nowrap text-xs">2 Discounts Applied</p>
                    </span>
                  </div>
                  
                  <div className=" flex justify-end">
                    <button
                      onClick={()=>{handleCheckOut()}}
                      className="hidden rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={()=>{handleCheckOutCash()} }
                      className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>

            </div>}    

{/* ************************************************* */}


          </div>
        </div>
      </section>
      
    </div>
    
  )
}

export default BodyCart

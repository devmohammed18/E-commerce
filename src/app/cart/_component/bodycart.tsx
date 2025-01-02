
'use client'
import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/util/redux/strore'
import { incrementCart,decrementCart, getTotalsAmount, getTotalsQuantity } from '../../util/redux/reduce'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
//import { useUser } from '@clerk/nextjs'



function BodyCart() {



  const router= useRouter()
  //const {user}=useUser()
  const {products,totalAmountCart,totalQuantityCart}=useSelector((state:RootState)=>state.cart)
  const dispatch=useDispatch()

  const handleCheckOut=()=>{
      
    //  if(!user) {
    //     router.push('/sign-in')
    //  }else{
    //   router.push('/checkout')
    //   //router.push(`/checkout?amount=${amount}`)
    //  }
     router.push('/checkout')

  }
 
  // const totalAmountCart = products.reduce((acc, product) => acc + (product.quantityCart * product.priceCart), 0);
  // const totalQuantityCart = products.reduce((acc, product) => acc + product.quantityCart, 0);


  useEffect(()=>{
    dispatch(getTotalsAmount())
    dispatch(getTotalsQuantity())
  },[products])
  console.log(products)


  

  
  return (
    
    <div className='w-full min-h-screen flex-col  justify-center items-center py-1 space-y-1 mt-[85px] mb-1 bg-[var(--secondry-color)]' >
    
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
               
                { products.map(({id,title_pro,desc_pro,sizeCart,images,priceCart,quantityCart },index:number)=>(
                   
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
                              
                                {/******************************  Quantity  ***********************/}
                              <div className='w-[150px] h-[35px] mt-2  rounded-full flex justify-center items-center  border-2 border-solid border-gray-400 '>
                                  {/* ****************Button Plus( + )  ************* */}
                                
                                  <button  className='w-[50px]  h-[35px] rounded-full border-0 border-solid flex justify-center items-center border-blue-500 hover:bg-slate-400 '
                                      
                                          onClick={() =>{ dispatch(incrementCart({
                                              id:id,
                                              title_pro:title_pro,
                                              desc_pro:desc_pro,
                                              images:images,
                                              priceCart:priceCart,
                                              sizeCart:sizeCart,
                                              quantityCart:quantityCart
                                          }))}}
                                  >+</button>
                                  
                                  {/* ******************* Input  ******************** */}
                                  <input className='w-[50px] h-[35px] text-center' disabled 
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
                                  
                                  className='w-[50px] h-[35px] rounded-full border-0 border-solid flex justify-center items-center border-blue-500 hover:bg-slate-400 '>
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

                  <div className="flex justify-end">
                    <button
                      onClick={()=>{handleCheckOut()}}
                      className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
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

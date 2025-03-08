'use client'
import {  typeProduct  } from "@/app/util/type/type"
//import React, { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {  useState } from "react"

function BodyProducts({products}:{products:typeProduct[]|undefined}) {
  
   const [selectImage,setSelectImage]=useState<{[key:number]:number}>({})
   
   const getImageSelected=(productsIndex:number)=>{

    console.log( 'selectImage[',productsIndex,']',selectImage[productsIndex])
    return   selectImage[productsIndex]!==undefined?selectImage[productsIndex]:0
   }

   const showImageSelected=(e:React.MouseEvent,productsIndex:number,indexImage:number)=>{
      e.preventDefault()
      e.stopPropagation()

     setSelectImage((prev)=>({
      ...prev,
      [productsIndex]:indexImage
     }))
    console.log('---------------------00000-------------',selectImage)  
    }
    

  return (
    <div className="w-full min-h-screen mt-[10px] mb-1 p-6 flex flex-wrap justify-around gap-y-5 gap-x-6 items-center bg-white border border-solid border-black">
          {/* //    {/*************************************** cards The products **************************/}
    {products && products.map(({id,title_pro,images}:typeProduct,productsIndex:number)=>{
      
       const CurrentSelectIndex=getImageSelected(productsIndex)

     return( <div className='sm:w-full w-72 h-full border-0 border-solid border-red-900'  key={productsIndex}>
          {/* href={`/productdetails/${id} `}   */}
          <Link href={`/productdetails/${id}?imageIndex=${CurrentSelectIndex}`}  className=" sm:w-full block rounded-lg p-4 shadow-sm shadow-gray-100 border hover:shadow-md hover:border hover:border-solid hover:border-gray-400 hover:rounded-lg ">
              {/* ********************   big image Cart Product ******************** */}
              <div className='relative w-full h-full box-border'> 
              
                   {images && images.length>0 && images[CurrentSelectIndex]?.url_image[0]?.url ?
                     
                      
                      (<div><Image
                              alt="image"
                              src={images[CurrentSelectIndex].url_image[0].url} width={1000} height={1000}
                              className=" sm:w-80 sm:h-full  h-72 w-full rounded-md object-cover"
                              />
                        </div>)
  
  
                       : ( <div className="w-full h-80 bg-gray-200 " >
                           <span>Image Available</span>
                           </div>)} 
                          {/************ *  Promotion Percentage ***********************/}
                          { images[CurrentSelectIndex].promotion_active &&<h3  className="w-12 h-12 flex justify-center items-center rounded-full border border-solid border-red-700 absolute top-3 right-4  text-md font-bold text-red-800">
                                { `-${images[CurrentSelectIndex].promotion_percentage} %`}
                            </h3>  } 
  
              </div>
              
              {/************************Details Cart Product **************************/}
              <div className="mt-2">
                {/* ********************   small image Cart Product ******************** */}
                <div className=" mt-3 flex items-center gap-2 text-xs">
                      
                      
                      {images.map(({url_image},imgIndex:number)=>{
                         
                    
                         return(<div
                      
                           key={imgIndex} 
                           onClick={(e)=>{showImageSelected(e,productsIndex,imgIndex)}} 
                           onMouseMove={(e)=>{showImageSelected(e,productsIndex,imgIndex)}}
                           className="w-10 h-12  sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                              <Image
                              alt={`Miniature ${imgIndex}`}
                              src={url_image[0].url} width={80} height={80}
                              className="h-full w-full rounded-md object-cover"
                              />
                          </div>)
                        }
                      
                      )}   
                  </div>
                 
                  <div>
                          <dt className="sr-only">title de produit</dt>
                          <dd className="font-medium">{title_pro}</dd>
                      </div>
                  <dl>
                      <div className="flex items-start">
                          <dt className="sr-only">Price</dt>
                          {images[CurrentSelectIndex].promotion_active && <dd className="text-sm text-gray-500">${ images[CurrentSelectIndex].promotion_price}</dd>}
                          <dd className={`text-sm text-gray-500 ${images[CurrentSelectIndex].promotion_active?'line-through text-red-600 ml-2':''}`}>
                             <span className="text-gray-600">${images[CurrentSelectIndex].price} </span>  
                          </dd>
                          
                      </div>
  
                      
                  </dl>
                
                
              </div>
          </Link>
  
      </div>)
})}
    </div>
  )
}

export default BodyProducts

'use client'
import { typeProduct } from '@/app/util/type/type'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GlobalContext } from '@/app/util/globalcontext/globalecontext'

// const getProducts = async () => {
    
//     try {
  
//       const res = await fetch
//         (`${process.env.NEXT_PUBLIC_API_URL}/products?populate[images][populate]=*`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
//             }
  
//           })
  
//       if (!res.ok) {
//         throw new Error(`Http status : ${res.status}`)
//       }
  
//       const data = await res.json()
//       const products: typeProduct[] = data.data
  
//       return products
  
//     } catch (error) {
//       console.log(error)
//     }
  
  
  
  
//   }

function ResultatSearch({searchTrem,loading,setLoading}:{searchTrem:string,setLoading:(value:boolean)=>void,loading:boolean}) {

   const [products,setProducts]=useState<typeProduct[]>([])
   const [filterProducts,setFilterProducts]=useState<typeProduct[]>([])
   const context=useContext(GlobalContext)
   if(!context){
     throw Error('')

   }

   const {setShowResultatSearch }=context
    useEffect(()=>{
       
        
        const fetchProducts = async () => {
            setLoading(true);
            try {
                
              const res = await fetch
                (`${process.env.NEXT_PUBLIC_API_URL}/products?populate[images][populate]=*`,
                  {
                    headers: {
                      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                    }
          
                  })
          
              if (!res.ok) {
                throw new Error(`Http status : ${res.status}`)
              }
          
              const data = await res.json()
             // const products: typeProduct[] = data.data
              setProducts(data.data)
             if(searchTrem){
              const filter=data.data.filter((product:typeProduct)=>product.title_pro.toLowerCase().includes(searchTrem.toLowerCase()))
              setFilterProducts(filter)
              setLoading(false)
            }
            // else{
            //     setFilterProducts(data.data)
            //     setLoading(false)
            // }

              
          
            } catch (error) {
              console.log(error)
            }finally{
                setLoading(false)
            }
          

          
          }
        
       fetchProducts()
               
        
               
        

    },[searchTrem,loading])

     useEffect(()=>{
      if(products.length>0){
       const filter=products.filter((product)=>product.title_pro.toLowerCase().includes(searchTrem.toLowerCase()))
       setFilterProducts(filter)
       setLoading(false)
      }

     },[products,searchTrem])

     if(filterProducts.length===0)
       return <div className="py-4 text-gray-600">No products found matching </div>;
    
    console.log('resultatSearch=====>',products)
  return (
    <div className='border-0 border-solid border-red-900 flex justify-between items-center gap-2 flex-wrap' >
      {
    filterProducts && filterProducts?.map(({id,images,title_pro}:typeProduct,index:number)=>{
       
       const CurrentSelectIndex=0
      return(
        <div key={index} className='border-0 border-solid border-red  text-red-600 box-border'>
            
            <Link href={`/productdetails/${id}?imageIndex=${CurrentSelectIndex}`}  
                  className="w-36  block rounded-lg p-2 shadow-sm shadow-gray-100 border-2 hover:shadow-md hover:border hover:border-solid hover:border-gray-400 hover:rounded-lg ">
              {/* ********************   big image Cart Product ******************** */}
              <div className='relative w-full h-40 box-border' onClick={()=>{setShowResultatSearch('')}} > 
              
                   {images && images.length>0 && images[CurrentSelectIndex]?.url_image[0]?.url ?
                     
                      
                      (<div><Image
                              alt="image"
                              src={images[CurrentSelectIndex].url_image[0].url} width={100} height={100}
                              className=" w-full h-40  rounded-md object-cover"
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
                      
                      
                      {/* {images.map(({url_image},imgIndex:number)=>{
                         
                    
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
                      
                      )}    */}
                  </div>
                 
                  <div>
                          <dt className="sr-only">title de produit</dt>
                          <dd className="font-medium text-[10px] text-justify line-clamp-1 ">{title_pro}</dd>
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
       

      })
      }
    </div>
  )
}

export default ResultatSearch

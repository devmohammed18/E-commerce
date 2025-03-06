
import React from 'react'

function ProductsDetailsSkeleton() {
  return (
    <div className='animate-pulse ' >


            <article className="overflow-hidden sm:flex-col md:flex-col w-full flex justify-center items-start gap-5 rounded-lg border-0 border-green-900 py-3 bg-white shadow-sm">
            {/***************************** Details Images ***************************************/}
           {/***************************** Details Images ***************************************/}
                      
                       <div className='sm:w-full md:w-full relative w-2/5 h-full border-0  box-border border-solid border-red-800'>
                           
                           <div className='sm:flex-col-reverse   md:flex-col-reverse   w-full h-full flex justify-center gap-4 items-start '>
                               {/******************** Box small image **********************/}  
                               <div className='2xl:flex-col 2xl:w-2/12 xl:flex-col xl:w-2/12 lg:flex-col lg:w-2/12 flex justify-start w-full h-full flex-wrap gap-2 cursor-pointer ' >
                              {/* {productdetails.images[indexColorImage].url_image.map(({url},index)=>( */}
                                {[...Array(4)].map((_,index)=>(
                                   <div key={index} 
           
                                   
                                   className=' w-20 h-24 box-border rounded-md  bg-gray-300 '
                                   ></div>)) }
                               </div>  
                                {/********************* Big image **************************/}
                               <div className='relative rounded-md md:w-full sm:w-full  w-11/12 h-[430px] rounder-xl bg-gray-300'>
                                
                               </div>
                           </div>
                           
                       </div>
           
           
                       {/**************************** Details Information the Products  ******************************/}
                      
                       <div className="sm:w-full   md:w-full p-4 w-2/5 h-full flex-col items-start justify-center space-y-4  border-0 border-solid border-red-800">
                               {/***********************  title The Product *******************/}
                               <div className="h-6 w-3/4 rounded-lg text-xl font-bold text-gray-900 text-transparent  bg-gray-300 "></div>
                              
                               {/***********************  Price The Product *******************/}
                              
                               
                                  <dl className='inline' >
                                  <div  className='flex items-start' >
                                      <dt className="sr-only">Price</dt>
                                       
                                       <dd  className={`h-6 w-3/4 mt-4 rounded-lg text-lg font-bold bg-gray-300 `}>
                                           <span className='text-gray-600'></span>
                                       </dd>
                                   </div>
                                   </dl>  
                               
           
                               {/*****************  description The Product ********************/}
           
                               <p className="mt-2 text-justify text-lg/relaxed text-gray-500"></p>
           
                               {/************************* colors the product ********************/}
                               <div className='w-full h-full flex justify-start gap-2 items-start '>
                                 
                                 
                                  {[...Array(2)].map((_,index)=>(
            
                                    <div key={index} 
                                         
                                         className='w-20 h-24 rounded-md border border-solid border-[var(--secondary-color)]  bg-gray-300'
                                        ></div> ))}
                                   
           
                               </div>
                              
                               {/************************** Sizes the Poducts  *******************/}
                               {/* className='w-full h-full flex justify-start items-center flex-wrap gap-x-4 gap-y-2 border-2 my-2 border-solid border-black' */}
                               
                               <div  className='sm:grid-cols-3 md:grid-cols-5  w-full h-full grid grid-cols-4 gap-2  p-2 ro my-2 rounded-lg border border-solid border-gray-300 cursor-pointer '>
                                   {[...Array(5)].map((_,index)=>(
                                       <div key={index} className='w-full h-10 flex justify-center  items-center border border-solid border-gray-300 rounded-lg bg-gray-300'
                                        > </div> ))}
                               </div>
                                
                                 {/************************** Add to Bag  *******************/}
                                 <div className='w-full flex-col justify-center items-center space-y-3' >
                               
                                   
                                   <button className='w-full text-xl text-[var(--secondary-color)] bg-gray-300 py-6 rounded-3xl capitalize ' 
                                    ></button>
           
                                   <button className='w-full text-xl text-[var(--primary-color)] bg-gray-300 py-6 rounded-3xl capitalize ' >
                                
                                   </button>
                                
                                 </div> 

                                  
                                   
           
                               
           
                             
                       </div>
            

            

           </article>





       
    </div>
  )
}

export default  ProductsDetailsSkeleton
 

'use client'
import { typeProduct } from '@/app/util/type/type'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { addCart } from '@/app/redux/cartreducer'
function BodyProductDetails({productdetails}:{productdetails:typeProduct} ) {
  
  const [indexPositionImage,setIndexPositionImage]=useState(0) //select la position de product
  const [indexColorImage,setIndexColorImage]=useState(0) //select la color de product
  const [selectColorImage,setSelectImage]=useState<number |null >(null)
  const [indexSize,setIndextSize]=useState<number |null >(null);// selected size 
  const [selectSize,setSelectSize]=useState<string>('')
//   const dispatch=useDispatch();  
  
  // retrieve all sizes the product this Color

  const [copieProductdetail,setCopieProductDetail]=useState<typeProduct>(
    
    {id:0,
    images:[],
    title_pro:"",
    desc_pro:"",
    priceCart:0,
    quantityCart:1}

  )
 
  useEffect(()=>{
    setCopieProductDetail(productdetails)

    console.log(copieProductdetail)
   },[indexColorImage])

  const selectSizes=copieProductdetail.images[indexColorImage]?.sizes || []
  
  // retrieve Size the product selected
  const selectedSize=selectSizes.filter((size)=>size.name_size===selectSize)

  //rertieve the color the product Selcted
  const selectedColorImage=copieProductdetail.images.filter(
    (image)=>image.id===selectColorImage)  
  // update the sizes ['s','m','l'] this product select by size selected
   
  

  // const updateColorImage=()=>{
  //   if(selectedColorImage.length>0){
  //     console.log(selectedSize)
  //    selectedColorImage[0].sizes=[{name_size:selectedSize[0].name_size}]
  //     console.log(productdetails)
  //   }
  //  }
 
   // if don t select size 
   const [alertSize,setAlerSize]=useState(false)
    // if don t select Color image
   const [alertSelectColorImage,setSelectColorImage]=useState(false)
   
 

   const addProduct=()=>{
   if (selectedSize.length>0 && selectedColorImage.length>0){

    setAlerSize(false)
    setSelectColorImage(false)
   
   // updateColorImage()
    
   //add product in the panie

//     dispatch(addCart({
//      id:copieProductdetail.id,
//      title_pro:copieProductdetail.title_pro,
//      desc_pro:copieProductdetail.desc_pro,
//      priceCart:copieProductdetail.priceCart,
//      images:selectedColorImage,
//      quantityCart:1,
//      sizeCart:selectedSize[0].name_size,
 
//    }))
  

   setCopieProductDetail(productdetails)
   
   //selectedColorImage[0].sizes = selectedSize.map(({ name_size }) => ({ name_size }));
  // selectedColorImage[0].sizes=selectedSize.map(({name_size})=> name_size);

   }else{
    setAlerSize(true)
    setSelectColorImage(true)
   }
  

   }
 
 
 
  return (
    <div>
         {productdetails.images[0].url_image.length>1 && 
           <article className="overflow-hidden sm:flex-col md:flex-col w-full flex justify-center items-start gap-5 rounded-lg border-0 border-green-900 py-3 bg-white shadow-sm">
            {/***************************** Details Images ***************************************/}
           
            <div className='sm:w-full md:w-full w-2/5 h-full border-0  box-border border-solid border-red-800'>
                
                <div className='sm:flex-col-reverse  md:flex-col-reverse   w-full h-full flex justify-center gap-4 items-start '>
                    {/******************** Box small image **********************/}  
                    <div className='2xl:flex-col 2xl:w-2/12 xl:flex-col xl:w-2/12 lg:flex-col lg:w-2/12 flex justify-start w-full h-full flex-wrap gap-2  ' >
                   {/* {productdetails.images[indexColorImage].url_image.map(({url},index)=>( */}
                     {productdetails.images[indexColorImage].url_image.map(({url},index)=>(
                        <div key={index} 

                        onMouseMove={()=>setIndexPositionImage(index)} onClick={()=>setIndexPositionImage(index)} 
                        className=' w-20 h-24 box-border rounded-md border border-solid border-[var(--secondary-color)] hover:border-[--primary-color] '
                          style={{border:indexPositionImage===index?'2px solid var(--primary-color)':''}} 
                         
                         >
                        
                            <Image 
                                alt="image"
                                src={ url}
                                width={100}
                                height={100}
                                className=" h-full w-full rounded-md object-cover"
                                />
                        
                        </div>

                        ))
                            }
                    </div>  
                     {/********************* Big image **************************/}
                    <div className='md:w-full sm:w-full  w-11/12 h-full rounder-xl'>
                        <Image
                            alt="image"
                            src={productdetails.images[indexColorImage]?.url_image[indexPositionImage]?.url}
                           // src={productdetails[0].images[0]?.url_image[0]?.url}
                            width={1000}
                            height={1000}
                            className="h-full w-full object-cover rounded-xl"
                            />
                    </div>
                </div>

            </div>


            {/**************************** Details Information the Products  ******************************/}
           
            <div className="sm:w-full md:w-full p-4 w-2/5 h-full flex-col items-start justify-center space-y-4 border-0 border-solid border-red-800">
                    {/***********************  title The Product *******************/}
                    <h3 className="text-lg font-medium text-gray-900">
                       {productdetails.title_pro}
                    </h3>
                   
                    {/***********************  Price The Product *******************/}
                    { productdetails.images.map(({price,},index:number)=>(
                        <h3 key={index} className="text-lg font-bold text-red-800">
                             {indexColorImage===index?`${price} $`:''} 
                        </h3>
                    ))
                    }

                    {/*****************  description The Product ********************/}

                    <p className="mt-2 text-justify text-lg/relaxed text-gray-500">
                    {productdetails.desc_pro}
                    </p>

                    {/************************* colors the product ********************/}
                    <div className='w-full h-full flex justify-start gap-2 items-start '>
                      
                      
                       {productdetails.images.map(({id,url_image},index)=>(
 
                         <div key={index} 
                              onClick={()=>{setIndexColorImage(index);setSelectImage(id);setIndexPositionImage(0)}}
                              className='w-20 h-24 rounded-md border border-solid border-[var(--secondary-color)] hover:border-[--primary-color]  '
                              style={{border:indexColorImage===index?'2px solid var(--primary-color)':''}}
                          >
                        
                         <Image 
                             alt="image"
                             src={ url_image[0].url}
                             width={100}
                             height={100}
                             className="h-full w-full object-cover rounded-md 
                            "
                             />
                          </div>
 
                       ))
                         }
                        

                    </div>
                    {alertSelectColorImage && <h1 className='text-red-600' >Please select a Color.</h1>} 
                    {/************************** Sizes the Poducts  *******************/}
                    {/* className='w-full h-full flex justify-start items-center flex-wrap gap-x-4 gap-y-2 border-2 my-2 border-solid border-black' */}
                    
                    <div  className='sm:grid-cols-3 md:grid-cols-5  w-full h-full grid grid-cols-4 gap-2  border-2 my-2 border-solid border-black '>
                        {productdetails.images[indexColorImage].sizes.map(({name_size},index)=>(
                            <div key={index} onClick={()=>{setIndextSize(index);setSelectSize(name_size)}} className='w-full h-10 flex justify-center  items-center border border-solid border-[var(--secondary-color)] rounded-lg hover:border-[var(--primary-color)]'
                             style={{border:indexSize===index?'2px solid var(--primary-color)':''}} >
                            {name_size}
                            </div>
                            ))
                        }
                    </div>
                     {alertSize && <h1 className='text-red-600' >Please select a size.</h1>} 
                      {/************************** Add to Bag  *******************/}
                      <div className='w-full flex-col justify-center items-center space-y-3' >
                    
                        
                        <button className='w-full text-xl text-[var(--secondary-color)] bg-[var(--primary-color)] py-3 rounded-3xl capitalize ' 
                         onClick={()=>{
                          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@')
                          console.log(selectSize)
                          console.log(selectedSize)
                          console.log([{ name_size: selectedSize.map(({ name_size }) => ({ name_size })) }])
                          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@')
                          addProduct()
                         
                        
                        }}
                         >
                            add to bag
                        </button>

                        <button className='w-full text-xl text-[var(--primary-color)] bg-[var(--secondary-color)] py-3 rounded-3xl capitalize ' >
                            favourite
                        </button>
                      </div>      
                       
                        

                    

                    {/* <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                    Find out more

                    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                        &rarr;
                    </span>
                    </a> */}
            </div>

           </article>
}
    </div>
  )
}

export default BodyProductDetails


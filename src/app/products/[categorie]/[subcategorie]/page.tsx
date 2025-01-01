
import { typeCategorie, typeProduct, typeSubCategorie } from "@/app/util/type/type"
import React from "react"
//import Image from "next/image"
import Link from "next/link"

type typeParamsCatSub=Promise<{categorie:typeCategorie,subcategorie:typeSubCategorie}>

const getProducts=async(categorie:typeCategorie,subcategorie:typeSubCategorie)=>{
 
    try{
         console.log('categorie>>>>>>Avant fetch ',categorie,'subcategorie>>>>>>Avant fetch ',subcategorie)
        const res=await fetch
        (`${process.env.NEXT_PUBLIC_API_URL}/products?populate[images][populate]=*&filters[categories][title_cat][$eq]=${categorie}&filters[subcategories][title_sub][$eq]=${subcategorie}`,
          {headers:{
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
          }
    
        })
    
        if(!res.ok){
            throw new Error(`Http sattus : ${res.status}`)
        }
        console.log('categorie>>>>>>Apres fetch ',categorie,'subcategorie>>>>>>Apres fetch ',subcategorie)
         const data=await res.json()
         const products:typeProduct[]=data.data
    
       return products

    }catch(error){
     console.log(error)
    }

 
   

}

async function Products({params,}:{params:typeParamsCatSub}) {
   
   const categorie=(await params).categorie
   const subcategorie=(await params).subcategorie
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    console.log(categorie)
    console.log(subcategorie)
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    const products=await getProducts(categorie,subcategorie);
    
  return (
    <div className='w-full min-h-screen mt-[60px] mb-1 p-6 flex flex-wrap justify-around gap-y-5 items-center bg-white border border-solid border-black  '>
      
        {/* <h1>Product{categorie}</h1> */}
         
        {/* //    {/*************************************** cards The products **************************/}
    {products && products.map(({id,title_pro},index:number)=>(
      
    <div className='w-72 h-full border-0 border-solid border-red-900'  key={index}>

        <Link href={`/productdetails/${id} `} className=" sm:w-full block rounded-lg p-4 shadow-sm shadow-indigo-100 border hover:shadow-md hover:border hover:border-solid hover:border-indigo-300 hover:rounded-lg ">
            {/* ********************   big image Cart Product ******************** */}
            <div className='w-full h-72 box-border'> 

                    {/* <Image
                            alt=""
                            src={images[0]?.url_image[0].url} width={1000} height={1000}
                            className=" sm:w-80 sm:h-full  h-72 w-full rounded-md object-cover"
                            /> */}

            </div>
            {/************************Details Cart Product **************************/}
            <div className="mt-2">
            
                <dl>
                    <div>
                        <dt className="sr-only">Price</dt>
                        {/* <dd className="text-sm text-gray-500">${images[0].price}</dd> */}
                    </div>

                    <div>
                        <dt className="sr-only">title de produit</dt>
                        <dd className="font-medium">{title_pro}</dd>
                    </div>
                </dl>

                <div className=" mt-3 flex items-center gap-2 text-xs">
                    
                    
                    {/* {images.map(({url_image},index:number)=>(
                        <div
                        //  onClick={()=>setIdImage(index)} 
                         
                         key={index} 
                        className="w-20 h-24  sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <Image
                            alt=""
                            src={url_image[0].url} width={80} height={80}
                            className="h-full w-full rounded-md object-cover"
                            />
                        </div>
                    ))}    */}
                </div>
              
            </div>
        </Link>

    </div>
    ))}
</div>

  )
}



export default Products




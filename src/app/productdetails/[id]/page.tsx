
import { typeProduct } from '@/app/util/type/type';
import BodyProductDetails from './_component/bodyProducts';
import { Suspense } from 'react';
// type params
type typeParams=Promise<{id:number}>

// fonction for to collect the product details
// const getProductDetait=async(id:number)=>{

//     const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?filters[id][$eq]=${id}&populate[images][populate]=*`,
//         {headers:{
//             Authorization:`Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
//         }})

//      const data=await res.json();
//      // {id:0,images:[{id:0,url_image:[{url:''}],sizes:[{name_size:''}],price:0}],title_pro:'',desc_pro:'',price:0}
//      const productDetails:typeProduct[]=data.data
//     return productDetails
// }


 async function  ProductDetalis({params}:{params:typeParams}) {
    
    const id=(await params).id
     console.log('idddddddddddd',id)
   
     const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?filters[id][$eq]=${id}&populate[images][populate]=*`,
        {headers:{
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }})
    
     const data=await res.json();
    
     const productdetails:typeProduct=data.data[0]

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>} >
    <div className='  w-full min-h-screen flex-col  justify-center items-center py-1 space-y-1 mt-[85px] mb-1 bg-[var(--secondry-color)]'>
    
       <BodyProductDetails productdetails={productdetails} />
 
    </div>
    </Suspense>  
  )
}



export default ProductDetalis
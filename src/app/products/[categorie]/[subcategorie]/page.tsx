
import { typeCategorie, typeProduct, typeSubCategorie } from "@/app/util/type/type"
import BodyProducts from "./_component/smallimage/bodyProducts"


type typeParamsCatSub=Promise<{categorie:typeCategorie,subcategorie:typeSubCategorie}>

const getProducts=async(categorie:typeCategorie,subcategorie:typeSubCategorie)=>{
 
    try{
         console.log('categorie>>>>>>Avant fetch ',categorie,'subcategorie>>>>>>Avant fetch ',subcategorie)
        const res=await fetch
        (`${process.env.NEXT_PUBLIC_API_URL}/products?populate[images][populate]=*&filters[categories][title_cat][$eq]=${categorie}&filters[subcategories][title_sub][$eq]=${subcategorie}`,
          {headers:{
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            'Cache-Control': 'no-store' // Pour toujours obtenir les données les plus récentes
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
     console.log('Error lors de la recupiration des produits :',error)
     return []
    }

 
   

}

async function Products({params}:{params:typeParamsCatSub}) {
   
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
         <BodyProducts products={products} />
    
    </div>

  )
}



export default Products




'use client'

import SubCategories from "../subcategories/subcategories"
import Link from "next/link"
import { useContext,useState } from "react"


import {typeSubCategorie} from "@/app/util/type/type"
import { typeCategorie } from "@/app/util/type/type"
import { IoIosArrowForward } from "react-icons/io";
import { ToggelHeaderContext } from "@/app/util/hooks/toggelHeaderContext"

function Categories({ categories,subCategories }:{categories:typeCategorie[],subCategories:[string,typeSubCategorie[]][]}) {




const [showList,setShowList]=useState<boolean>(true)

const context=useContext(ToggelHeaderContext);
if(!context){

    throw new Error("ToggelHeaderContext must be used within a HeaderContextProvider")
}

if (!categories || !subCategories) {
    return <div>Categories or SubCategories data is missing.</div>;
  }

const {titleCat,setTitleCat,setToggelSub,toggelSub}=context
console.log('*************************************************')
console.log(categories)
console.log('*************************************************')
console.log('================categorie=================')
  console.log(subCategories)
  console.log('================categorie=================') 


const functionShowList = (e: React.MouseEvent,filtercat:string) => {  

  e.preventDefault();
   setTitleCat(filtercat)
   

};


  return (
    <div className="sm:w-full sm:flex-col sm:items-start  
                    md:w-full md:flex-col md:items-start 
                    flex  justify-center items-center gap-3  ">
          {categories && categories.map(({title_cat}:typeCategorie,index:number)=>(
       
       //    sm:static sm:py-0 sm:items-center sm:w-full
        
           <div key={index}  
                className="sm:static sm:w-full sm:justify-start sm:py-2 sm:items-start sm:border-b sm:border-solid sm:border-b-[var(--secondary-color)] 
                           md:static md:w-full md:justify-start md:py-2 md:items-start md:border-b md:border-solid md:border-b-[var(--secondary-color)]  
                           
                          relative py-7 box-border  flex justify-center items-center transition-all duration-500 ease-linear  ">          
                 
                 <div className="w-full flex justify-between items-center">
                    <Link href="#" 
                           onMouseMove={(e)=>{functionShowList(e,title_cat);setShowList(true);setToggelSub(false)}} 
                           onClick={(e)=>{setToggelSub(false);functionShowList(e,title_cat);setShowList(true)}} 
                          >
                          {title_cat}
                    </Link>
                    <span className="hidden sm:block md:block" ><IoIosArrowForward /></span> 
                 </div>
              { titleCat===title_cat  && showList && !toggelSub && <SubCategories title_cat={title_cat} subCategories={subCategories} setShowList={setShowList} />}

            {/* onMouseMove={(e)=>showList(e,title_cat) } onClick={(e)=>{showList(e,title_cat),setShow(true),console.log('title_cat:',title_cat) }}  */}
           {/*  style={{left:show?'0':'-600px'}}  ${filtercategories===title_cat}?auto:hidden  sm:static sm:w-full sm:translate-x-0 */}
           {/* { filtercategories===title_cat &&  <ul 
           className="sm:static sm:bg-slate-700  sm:translate-x-0 sm:w-full  w-60 absolute top-full -translate-x-1/2  bg-slate-500  " 
           >


           <div  className="sm:gap-2  py-3 border-2 border-solid border-black  flex flex-col gap-6 justify-center items-start ">

           { products.filter(item=>item.categories[0].title_cat===title_cat).map(({id,title})=>(


           <li key={id} className="sm:text-lg sm:opacity-80 sm:pl-2 pl-5 capitalize "> 
           <Link onClick={(e)=>showList(e,"") } href='#' className="cursor-pointer" >{title}</Link>
           </li>

           ))} 
           </div>    
           </ul>} */}
     
          </div>

 

   ))}
   

      
    </div>
  )
}

export default Categories


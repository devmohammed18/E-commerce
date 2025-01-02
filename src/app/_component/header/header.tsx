'use client'
import { useEffect, useState } from "react"
import { IoMenuSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
//import { IoMdContact } from "react-icons/io";
import NavBar from "../navbar/navbar";
import { ToggelHeaderContext } from "@/app/util/hooks/toggelHeaderContext";


import Link from "next/link";
import { typeCategorie, typeSubCategorie } from "@/app/util/type/type";
import MenuCart from "../menucart/menucart";
   import { useSelector } from "react-redux";
    import { RootState } from "@/app/util/redux/strore";
// import { ClerkLoaded, UserButton, useUser } from "@clerk/nextjs";





function Header({categories,subCategories}:{categories:typeCategorie[],subCategories:[string,typeSubCategorie[]][]}) {
 // const {user}=useUser();
useEffect(()=>{
 

},[])

  const [showCart,setShowCart]=useState<boolean>(false)// show catr 
  const [toggelNav,setToggelNav]=useState<boolean>(false)// close and show navbar
  
  const [toggelSub,setToggelSub]=useState<boolean>(false)// show list subcategorie
  const [titleCat,setTitleCat]=useState<string>("")// title Categorie
   const products=useSelector((state:RootState)=>state.cart.products)
 console.log('================header=================')
  console.log(subCategories)
  console.log('================header=================') 
  return  (
    
    <ToggelHeaderContext.Provider value={{showCart,setShowCart,titleCat,setTitleCat,toggelNav,setToggelNav,toggelSub,setToggelSub}} >
    <div className="w-full">
        <div onMouseMove={()=>{console.log("-------------------->",titleCat)}} className=" z-20 w-full h-[80px] fixedHeader flex justify-between items-center border-0 border-red-800 border-solid bg-[var(--primary-color)] text-[var(--secondary-color)] cursor-pointer" >
            <div className="w-11/12 mx-auto flex justify-between items-center border-0 border-yellow-400 border-solid ">
                  
                  
                  <div  className=" sm:gap-5 flex justify-between items-center  gap-14 border-0 border-solid border-red-800 cursor-pointer" >
                    
                      <button onClick={()=>{setToggelNav(true);setToggelSub(true)}} 
                           className="hidden sm:block md:block cursor-pointer text-2xl" >
                        <IoMenuSharp />
                      </button>
                      
                      <div className="sm:text-md text-xl text-nowrap">
                        <Link href="/" >E-comerce</Link> 
                      </div>
                      
                    <NavBar categories={categories} subCategories={subCategories} />
                  </div>

                  <div className="flex justify-between items-center gap-2">
                      <div className="relative" >

                        <span className=" absolute right-0.5 -top-1 w-5 h-5 rounded-full flex justify-center items-center bg-red-700 ">
                         {products.length}
                        </span>
                        <button onClick={()=>setShowCart(true)} 
                                className="sm:text-md w-10 h-10 flex justify-center items-center text-xl bg-transparent  rounded-full hover:bg-slate-700 " ><FaShoppingCart /> 
                        </button>
                      </div> 


{/* 
                      <ClerkLoaded>
                        {user?
                        
                            <UserButton />
                        
                        :
                        <Link href='/sign-in'
                        className="sm:text-md w-10 h-10 flex justify-center items-center text-2xl bg-transparent rounded-full hover:bg-slate-700 " >
                            
                        <IoMdContact />
                        
                    
                        </Link> }
                      </ClerkLoaded> */}
              
                </div>
            </div>

        </div>

      <MenuCart />
    </div>
   
    </ToggelHeaderContext.Provider>
  )
}

export default Header

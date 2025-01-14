'use client'
import { useContext, useEffect} from "react"
import { IoMenuSharp } from "react-icons/io5"; //icon MenuBorger
import { FaShoppingCart } from "react-icons/fa";//icon cart
import { IoMdContact } from "react-icons/io"; //icon menu contact
import NavBar from "../navbar/navbar";



import Link from "next/link";
import { typeCategorie, typeSubCategorie } from "@/app/util/type/type";
import MenuCart from "../menucart/menucart";
import { useSelector } from "react-redux";
import { RootState } from "@/app/util/redux/strore";
import {  UserButton, useUser } from "@clerk/nextjs";
import { GlobalContext } from "@/app/util/globalcontext/globalecontext";





function Header({categories,subCategories}:{categories:typeCategorie[],subCategories:[string,typeSubCategorie[]][]}) {
  const {user}=useUser();
useEffect(()=>{
 

},[])

  // const [showCart,setShowCart]=useState<boolean>(false)// show catr 
  // const [toggelNav,setToggelNav]=useState<boolean>(false)// close and show navbar
  
  // const [toggelSub,setToggelSub]=useState<boolean>(false)// show list subcategorie
  // const [titleCat,setTitleCat]=useState<string>("")// title Categorie
  
  const products=useSelector((state:RootState)=>state.cart.products)
  const context =useContext(GlobalContext)
  if(!context){
    throw new Error ('GlobalContext must be used within a HeaderContextProvider')
  }
  const {setShowCart,titleCat,setToggelNav,setToggelSub,disableFaShoppingCart,setDisableFaShoppingCart}=context
 console.log('================header=================')
  console.log(subCategories)
  console.log('================header=================') 
  return  (
    
   // <ToggelHeaderContext.Provider value={{showCart,setShowCart,titleCat,setTitleCat,toggelNav,setToggelNav,toggelSub,setToggelSub}} >
    <div className="w-full">
        <div onMouseMove={()=>{console.log("-------------------->",titleCat)}} className=" z-20 w-full h-[80px] fixedHeader flex justify-between items-center border-0 border-red-800 border-solid bg-[var(--primary-color)] text-[var(--secondary-color)] cursor-pointer" >
            <div className="w-11/12 mx-auto flex justify-between items-center border-0 border-yellow-400 border-solid ">
                  
                  
                  <div  className=" sm:gap-5 flex justify-between items-center  gap-14 border-0 border-solid border-red-800 cursor-pointer" >
                    
                      <button onClick={()=>{setToggelNav(true);setToggelSub(true);setShowCart(false);setDisableFaShoppingCart(false)}} 
                           className="hidden sm:block md:block cursor-pointer text-2xl" >
                        <IoMenuSharp />
                      </button>
                      
                      <div className="sm:text-md text-xl text-nowrap">
                        <Link href="/" >E-comerce</Link> 
                      </div>
                      
                    <NavBar categories={categories} subCategories={subCategories} />
                  </div>

                  <div className="flex justify-between items-center gap-2">
                      <div className="relative sm:z-10 md:z-10" >

                        <span className=" absolute right-0.5 -top-1 w-5 h-5 rounded-full flex justify-center items-center bg-red-700 ">
                         {products.length}
                        </span>
                        <button onClick={()=>{setShowCart(true);setToggelNav(false)} } 
                                disabled={disableFaShoppingCart}
                                className="sm:text-md w-10 h-10 flex justify-center items-center text-xl bg-transparent  rounded-full hover:bg-slate-700 " ><FaShoppingCart /> 
                        </button>
                      </div> 
                       
                       {/* <ClerkLoaded> */}
                        {/* {
                          user?
                          <SignedIn>
                                <UserButton />
                          </SignedIn>
                          :
                          <SignedOut>
                            <SignInButton/>
                          </SignedOut>
                        } */}

                       {/* </ClerkLoaded> */}

                      

                      {/* <ClerkLoaded> */}
                        {user?
                        
                            <UserButton />
                        
                        :
                        <Link href='/sign-in'
                        className="sm:text-md w-10 h-10 flex justify-center items-center text-2xl bg-transparent rounded-full hover:bg-slate-700 " >
                            
                        <IoMdContact />
                        
                    
                        </Link> }
                      {/* </ClerkLoaded> */}
              
                </div>
            </div>

        </div>

      <MenuCart />
    </div>
   
   // </ToggelHeaderContext.Provider>
  )
}

export default Header

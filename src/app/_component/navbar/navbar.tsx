import React, { useContext } from 'react'
import Categories from '../categories/categories'
import { LiaTimesSolid } from 'react-icons/lia'

import Link from 'next/link';
import { typeCategorie, typeSubCategorie} from '@/app/util/type/type';
import { GlobalContext } from '@/app/util/globalcontext/globalecontext';


function NavBar({categories,subCategories}:{categories:typeCategorie[],subCategories:[string,typeSubCategorie[]][]}) {

 const context =useContext(GlobalContext);

 if(!context){
    throw new Error ("GlobalContext must be used within a GlobalContextProvider")
 }
 
    const {toggelNav,setToggelNav,setToggelSub}=context;
 
 console.log('================navbar=================')
 console.log(subCategories)
 console.log('================navbar=================') 
    return (
    <div className='flex justify-center items-center border-0 border-solid border-green-900'>
           
<div  style={{left:toggelNav?'0':'-1400px' }}
      className={`sm:z-50 md:z-30 sm:fixed sm:top-0 sm:bottom-0 sm:-left-[300px] sm:w-full sm:bg-[var(--primary-color)] 
                  md:fixed md:top-0 md:bottom-0  md:w-full  md:bg-[var(--primary-color)] 
                  flex justify-center items-start  text-xl transition-all duration-500 ease-linear `}>
         {/*  md:pl-2 md:flex-col md:items-start md:w-full md:mt-20 */}
       
        <div className="sm:w-full sm:flex-col sm:items-start sm:justify-center sm:mt-28 sm:px-4
                        md:w-full md:flex-col md:items-start md:justify-center md:mt-20 md:px-14 w-full  flex  justify-center items-center gap-3
                        border-0 border-solid border-red-700 " >
           {/****************************** Link Home ***********************************  */}     
                <Link 
                     className='sm:w-full sm:py-2 sm:border-b sm:border-solid sm:border-b-[var(--secondary-color)] 
                      md:w-full md:py-2 md:border-b md:border-solid md:border-b-[var(--secondary-color)]'  href='/'>
                      home
                </Link>
               {/****************************** Link Categories ***********************************  */}        
                <Categories categories={categories}  subCategories={subCategories} />
                
                
        </div>

          {/****************************** button close ***********************************  */}     
        <button onClick={()=>{setToggelNav(false);setToggelSub(true)}} className="hidden sm:block sm:absolute sm:top-5 md:block md:absolute md:top-5 left-3  text-red-500 text-2xl font-bold ">
           <LiaTimesSolid />
        </button>
       
    </div>

      
    </div>
  )
}

export default NavBar

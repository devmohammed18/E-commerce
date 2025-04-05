'use client'
import { useRouter ,usePathname, useSearchParams } from 'next/navigation';
import React, { Suspense, useContext, useState } from 'react'
import { ImSearch } from "react-icons/im";
import ResultatSearch from './resultatSearch';
import { GlobalContext } from '@/app/util/globalcontext/globalecontext';

// export interface typeLoading{
//     loading:boolean,
//     setLoading:(value:boolean)=>void
// }

function SearchProductsClient() {
const searchParms=useSearchParams()
const pathname=usePathname()
const router=useRouter()
//Show list the product after search 

const [loading,setLoading]=useState<boolean>(false)

const context=useContext(GlobalContext)

if(!context){
  throw Error('')
}
const {setShowResultatSearch,showResutatSearch}=context
//handleSearch
const handleSearch=(searchTerm:string)=>{
  const params= new URLSearchParams(searchTerm)
  if(searchTerm){
     params.set('query',searchTerm)
     setShowResultatSearch(searchTerm)
  }else{
    params.delete('query')
    setShowResultatSearch(searchTerm)
  }

  router.replace(`${pathname}?${params.toString()}`)


}




  return (
    <div className="  relative w-full border-0 border-solid border-red-800 ">
        {/* ********************************** input Search ********************************** */}
        <input type='text' defaultValue={searchParms.get('query')?.toString()} onChange={(e)=>handleSearch(e.target.value)} 
               className='  w-full h-10 rounded-full text-black border border-solid p-2 border-white cursor-text' />  
        <span className="sm:text-xl sm:font-extrabold  absolute top-[12px] right-4 pr-2" ><ImSearch /></span>
       {loading && <span className=" text-red-600 absolute top-[8px] right-8 pr-2 "> Loading..... </span>}
       {/* *************************************list Search ****************************************** */}
        {showResutatSearch && <div className='z-50 absolute w-full h-80 overflow-auto bg-white p-3 border-2 border-solid border-blue-500' >
                <div className='' >
                    <p>{showResutatSearch}</p>
                     <ResultatSearch searchTrem={showResutatSearch} setLoading={setLoading} loading={loading} />
                </div>
        </div>}
    
    </div>
  )
}


// Create a wrapper component that uses Suspense
function SearchProducts() {
  return (
    <Suspense fallback={
      <div className="relative w-full">
        <div className="sm:hidden w-full h-10 rounded-full bg-gray-100 animate-pulse"></div>
        <span className="sm:text-xl sm:font-extrabold  absolute top-[12px] right-4 pr-2">
          <ImSearch />
        </span>
      </div>
    }>
      <SearchProductsClient />
    </Suspense>
  );
}

export default SearchProducts;




//export default SearchProducts

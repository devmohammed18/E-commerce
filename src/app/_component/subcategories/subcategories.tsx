'use client'
// import { usefetch } from "@/app/util/fetchApi/useFetch"
// import ProductContex from "@/app/util/hooks/productContext"
//import Link from "next/link"
import { Dispatch, SetStateAction, useContext } from "react"
import { typeSubCategorie } from "@/app/util/type/type"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { GlobalContext } from "@/app/util/globalcontext/globalecontext";
import { useRouter } from "next/navigation";
//setShowList
export default function SubCategories({ title_cat, subCategories,  }:
    { title_cat: string, subCategories: [string, typeSubCategorie[]][], setShowList: Dispatch<SetStateAction<boolean>> }) {

    // const [titleSub,setTitleSub]=useState<>("")
    const router=useRouter()
    const context = useContext(GlobalContext)

    if (!context) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider")
    }

    if (!title_cat) {
        return null
    }
   //setToggelNav
    const { setToggelSub, toggelSub,setToggelNav  } = context
   
    const handleSubCategorieClick=(e:React.MouseEvent<HTMLDivElement,MouseEvent>,title_cat:string,title_sub :string)=>{
        e.preventDefault()
        router.push(`/products/${title_cat}/${title_sub} `)
        // setTimeout(()=>{ 
             
        //    },100)
           // setShowList(false);
          //  setToggelSub(false)
           setToggelNav(false); 
       
    }

    //   const handelApi=(e:React.MouseEvent,filter:string)=>{


    //   }

    console.log('================subCategorie=================')
    console.log(subCategories[0][0])
    console.log(subCategories[0][1])
    console.log(subCategories)
    console.log('================subCategorie=================')

    //const {data,loading,error}=usefetch(`/subcategories?filters[categories][title_cat]=${title_cat}`)
    // const [dataSubCategorie,setSubCategorie]=useState([])
    // useEffect(()=>{
    //  setSubCategorie(data)

    // },[data])
    //console.log(data)

    return (
        <div className=" ">
            <ul

                className={`sm:z-20 sm:fixed sm:top-20 sm:bottom-0 sm:w-full ${toggelSub ? 'sm:left-[500px]' : 'sm:left-[0px]'} 
                      md:z-20 md:fixed md:top-20 md:bottom-0 md:w-full ${toggelSub ? 'md:left-[1000px]' : 'md:left-[0px]'} 
                      transition-all duration-300 ease-linear  w-72 mt-3 absolute top-full  left-0 bg-[var(--primary-color)] 
                      border-0 border-solid border-y-amber-500` }>
                <div onClick={() => setToggelSub(true)}
                    className=" sm:py-4 sm:px-2 sm:mb-8 md:py-4 md:px-2 md:mb-8
                          bg-slate-800 flex justify-center items-center border border-solid border-gray-400">

                    <span className="hidden sm:block sm:w-2/5 md:w-2/5  md:block"><IoIosArrowBack /></span>

                    <div className="hidden sm:w-3/5 sm:block md:w-3/5  md:block capitalize " >
                        {title_cat}
                    </div>

                </div>

                <div onMouseLeave={() => { setToggelSub(!toggelSub) }} className="sm:gap-2  w-full bg-[var(--primary-color)]  
                  flex flex-col justify-start items-start border-0 border-solid border-red-900">

                    {
                        subCategories.map((item) => (


                            item[0] === title_cat && item[1].map(({ title_sub }: typeSubCategorie, index: number) => {
                              
                              
                              if(!title_sub) return null
                              return (<li key={index} className="sm:text-xl sm:opacity-80  sm:px-3  sm:py-2   w-full pl-4 py-2  capitalize hover:bg-slate-600">
                                    <div className="sm:w-full sm:border-b-2 sm:border-solid sm:py-2 sm:border-[var(--secondary-color)]
                                        md:w-full md:border-b-2 md:border-solid md:py-2 md:border-[var(--secondary-color)]  
                                        flex justify-between items-center"
                                        >
                                        {/* handelApi(e,`products?populate[images][populate]=*&filters[categories][title_cat][$eq]=${title_cat}&filters[subcategories][title_sub][$eq]=${title_sub}`), */}
                                        <div
                                          
                                            className="cursor-pointer w-full " 
                                            onClick={(e) => {handleSubCategorieClick(e,title_cat,title_sub) }}>
                                            {title_sub}
                                        </div> 

                                        {/* <Link
                                            href={`/products/${title_cat}/${title_sub} `}
                                            className="cursor-pointer w-full " 
                                            onClick={() => { setShowList(false); setToggelNav(false); setToggelSub(false) }}>
                                            {title_sub}
                                        </Link> */}
                                        <span className="hidden sm:block md:block" ><IoIosArrowForward /></span>
                                    </div>
                                </li>)

                           })







                        ))


                    }
                </div>

            </ul>
        </div>

    )
}

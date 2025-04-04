'use client'
import { GlobalContext } from "../globalcontext/globalecontext"
import { useState } from "react"

interface typeChildren {
    children: React.ReactNode
}


function ProviderGlobal({ children }: typeChildren) {


    const [showCart, setShowCart] = useState<boolean>(false)// show catr 
    const [toggelNav, setToggelNav] = useState<boolean>(false)// close and show navbar
    
    const [isShowProducts,setIsShowProducts]=useState<boolean>(false)

    const [showResutatSearch,setShowResultatSearch]=useState<string>('')//show Resulata Search

    const [toggelSub, setToggelSub] = useState<boolean>(false)// show list subcategorie
    const [titleCat, setTitleCat] = useState<string>("")// title Categorie
    const [disableFaShoppingCart,setDisableFaShoppingCart]=useState<boolean>(false)//
    const [disCounterQuantity,setDisCounterQuantite]=useState<boolean>(false)//
    return (
        <GlobalContext.Provider 
        value={{ showCart, setShowCart, toggelNav, setToggelNav, toggelSub, setToggelSub,showResutatSearch,setShowResultatSearch,titleCat,setTitleCat,disableFaShoppingCart,setDisableFaShoppingCart,disCounterQuantity,setDisCounterQuantite,isShowProducts,setIsShowProducts }} >
            <div>
                {children}
            </div>
        </GlobalContext.Provider>
    )
}

export default ProviderGlobal

import {Dispatch, SetStateAction } from "react";

/*************************type cartState reducer **************************************** */
export interface typeCartState {
    products:typeProduct [],
    totalQuantityCart:number,
    totalAmountCart:number,
  }
/************************* type Products**************************************** */
export interface typeProduct{
    id:number,
    images:{id:number,url_image:{url:string}[],sizes:[{name_size:string}],price:number,promotion_percentage:number,promotion_price:number,promotion_active:boolean}[],
    title_pro:string,
    desc_pro:string,
    priceCart:number,
    quantityCart:number  //i used this just for cart
    sizeCart?:string,//i used this just for cart
   

}
/************** type Props Toggel NavBar (header , navber,categorie,subcategorie) ****************************************************** */
export interface propsToggelNav{
    toggelNav:boolean,
    setToggelNav:(value:boolean)=>void
 
   }

 /****************************** propsHeader *********************************************/
 export interface propsHeader{
    categories: typeCategorie[],
    subCategories:string[]
  }
 
/*********************** type datecategorie ********************************************************* */
export interface typeCategorie{
    title_cat:string
}
/************************ type Data SubCategorie*********************************************************** */
export interface typeSubCategorie{
    title_catt:string,
    title_sub:string
}


/*********************** type props fonction subcategorie.tsx****************************** */
export interface propsSub{
    title_cat:string,
    toggelSub:boolean,
    setToggelSub:(value:boolean)=>void
    
    } 

   
/************************* type GlobaleContext All State the appliction  **************************** */
export interface typeGlobalContext{
    
    titleCat:string,
    setTitleCat:Dispatch<SetStateAction<string>>,
    toggelSub:boolean,
    setToggelSub:Dispatch<SetStateAction<boolean>> 
    toggelNav:boolean,
    setToggelNav:Dispatch<SetStateAction<boolean>>
    showCart:boolean,
    showResutatSearch:string ,
    setShowResultatSearch:Dispatch<SetStateAction<string>>,
    setShowCart:Dispatch<SetStateAction<boolean>>
    disableFaShoppingCart:boolean,
    setDisableFaShoppingCart:Dispatch<SetStateAction<boolean>>
    disCounterQuantity:boolean,
    setDisCounterQuantite:Dispatch<SetStateAction<boolean>>
    isShowProducts:boolean,
    setIsShowProducts:Dispatch<SetStateAction<boolean>>

}
/************* tye the button increment and decrement quantity the cart******** */
export interface typeBtnCounterQuantity{
    width:number,
    height:number,
    id:typeProduct['id'],
    title_pro:typeProduct['title_pro'],
    desc_pro:typeProduct['desc_pro'],
    images:typeProduct['images'],
    priceCart:typeProduct['priceCart'],
    sizeCart:typeProduct['sizeCart'],
    quantityCart:typeProduct['quantityCart']
  }
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
    images:{id:number,url_image:{url:string}[],sizes:[{name_size:string}],price:number,}[],
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

   
/************************* type Toggel  **************************** */
export interface typeGlobalContext{
    
    titleCat:string,
    setTitleCat:Dispatch<SetStateAction<string>>,
    toggelSub:boolean,
    setToggelSub:Dispatch<SetStateAction<boolean>> 
    toggelNav:boolean,
    setToggelNav:Dispatch<SetStateAction<boolean>>
    showCart:boolean,
    setShowCart:Dispatch<SetStateAction<boolean>>
    disableFaShoppingCart:boolean,
    setDisableFaShoppingCart:Dispatch<SetStateAction<boolean>>
}

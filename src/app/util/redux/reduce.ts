
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {typeCartState ,typeProduct } from '../type/type'; 




const initialState: typeCartState = {
  products: (() => {
    if(typeof window !='undefined' && typeof localStorage!='undefined'){
      const productsInStorage = localStorage.getItem('products');
      return productsInStorage ? JSON.parse(productsInStorage) : [];
    }
    return [] //Retourne un tableau vide si localStorage n'est pas disponible (côté serveur)
  })(),
  totalQuantityCart:0,
  totalAmountCart:0,
}

export const cartSlice = createSlice({
  name:"cart",
  initialState,
  reducers: {
    addCart: (state,action:PayloadAction<typeProduct>) => {

      if(state.products.length===0){
        state.products.push(action.payload)
      }else if(state.products.length>0){
    
            const indexproduct = state.products.findIndex((item)=>item.id===action.payload.id && item.sizeCart===action.payload.sizeCart && item.images[0].id===action.payload.images[0].id )
            console.log('indexproduct'+indexproduct)

           // if indexproduct >=0 the product is available in the cart
            if(indexproduct>=0){

              console.log('----------------- Cart  ---------------------')

              console.log('name Poroduct :',state.products[indexproduct].title_pro)
              console.log('sizeSelect :',state.products[indexproduct].sizeCart)
              console.log('Quantity :',state.products[indexproduct].quantityCart )
              
              console.log('--------------------------------------')
              
              //state.products[indexproduct].cartQuantity+=action.payload.cartQuantity
                 
              // I m use quantity optional in typeproduct 
              // if (action.payload.quantity !== undefined) {
              //   // Si oui, ajouter à quantity
              //    state.products[indexproduct].quantity = (state.products[indexproduct].quantity || 0) + action.payload.quantity;
              //   }
                 
              state.products[indexproduct].quantityCart+=action.payload.quantityCart;
            }
         

           // if indexproduct===-1 the product is not available in the cart
            if(indexproduct===-1){
              state.products.push(action.payload)

            }   

      }
      localStorage.setItem('products',JSON.stringify(state.products))

          //update the totalQuantityCart
          //  state.totalQuantityCart=state.products.reduce((total,itemProducts)=>
          // { return total+=itemProducts.quantityCart},0) 
          //update the totalAmountCart

          // state.totalAmountCart=state.products.reduce((total,itemProducts)=>{
          //   return total+=itemProducts.quantityCart*itemProducts.images[0].price
          // },0)
          //  console.log('Total Quantite',state.totalQuantityCart)
          //  console.log('Total Amount ',state.totalAmountCart)

    },
    
    incrementCart:(state,action:PayloadAction<typeProduct>)=>{
      
      const indexproduct=state.products.findIndex((item)=>item.id===action.payload.id && item.sizeCart===action.payload.sizeCart && item.images[0].id===action.payload.images[0].id )
      if(indexproduct>=0){
        
         state.products[indexproduct].quantityCart+=1
          
      }
      localStorage.setItem('products',JSON.stringify(state.products))
    },

    decrementCart:(state,action:PayloadAction<typeProduct>)=>{
      
      const indexproduct=state.products.findIndex((item)=>item.id===action.payload.id && item.sizeCart===action.payload.sizeCart && item.images[0].id===action.payload.images[0].id )
     console.log('#########################################')
      console.log('product ID',state.products[indexproduct].id)
      console.log( 'title:',state.products[indexproduct].title_pro)
      console.log('Image ID:',state.products[indexproduct].images[0].id)
      console.log('size:',state.products[indexproduct].sizeCart)
      console.log('Quantiry :',state.products[indexproduct].quantityCart)
      console.log('#########################################')
      if(indexproduct>=0){

       if(state.products[indexproduct].quantityCart>1){

          state.products[indexproduct].quantityCart-=1

       }else if(state.products[indexproduct].quantityCart===1){
         state.products=  state.products.filter((item)=>item.id!=action.payload.id || item.sizeCart!=action.payload.sizeCart || item.images[0].id!=action.payload.images[0].id )
           
          }

      } 
      localStorage.setItem('products',JSON.stringify(state.products))
    
    },

   removeCart:(state)=>{

      state.products=[]
      // Check if localStorage is available before setting the value
  if (typeof localStorage !== 'undefined') {
    // Save the empty products array to localStorage
    localStorage.setItem('products', JSON.stringify(state.products));
  } else {
    console.error('localStorage is not available.');
  }
      
     },
    
    //calcul the totalAmountCart
    getTotalsAmount:(state)=>{
      state.totalAmountCart=state.products.reduce((total,itemProduct)=>{
      return total+=itemProduct.quantityCart*itemProduct.images[0].price
      },0)

    },
    //calcul the TotalQuantity
    getTotalsQuantity:(state)=>{
      state.totalQuantityCart=state.products.reduce((total,itemProduct)=>{
      return total+=itemProduct.quantityCart
      },0)



    }

    

  },
})

// Action creators are generated for each case reducer function
export const { addCart,incrementCart,decrementCart,removeCart,getTotalsAmount,getTotalsQuantity} = cartSlice.actions

export default cartSlice.reducer
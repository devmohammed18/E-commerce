'use client'
import React, { useState,useEffect, } from 'react'
import  { typeFraisLivraison } from '../bodycheckoutcash/bodycheckoutcash'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/util/redux/strore'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Loading1 from '@/app/_component/loading/loading'
import ModePaiement from '../modepaiemnet/modepaiement'
import { removeCart } from '@/app/util/redux/reduce'
import { useElements, useStripe } from '@stripe/react-stripe-js'
//  import { useElements, useStripe } from '@stripe/react-stripe-js'
// import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';



// interface typeDataCart{
//   dataCart:{ 
//     images: {id: number;url_image: {url: string;}[]; sizes: [{name_size: string;}]; price: number;
//              }[];
//     quantityCart: number;
//     sizeCart: string | undefined;
// }[]
// }

interface typeFormFraisLivraison{
    username:string|null|undefined,
    email:string|null|undefined,
    ville:string,
    adress:string,
    typeLivraison:string,
    telephone:string
    sousTotal:number,
    fraisLivraison:number|undefined,
    total:number|undefined,
    typePaiement:string,
    dataCart:{ 
          images: {id: number;url_image: {url: string;}[]; sizes: [{name_size: string;}]; price: number;
                  }[];
          quantityCart: number;
          sizeCart: string | undefined;}[],
    numberOrder:string,
}




function FormFraisLivraison({indexDataFaisLivraison,valueTypeLiveraison ,DataFraisLivraison,convertirFraisLivrisonInumber,handlerList,handlerBtnRadio,frais_livraison,totaleAmountPlusLivraison}:typeFraisLivraison) {
 
 

 const user=useUser()
 const router=useRouter()
 const dispatch=useDispatch()
 const stripe = useStripe();
 const elements = useElements();
const {products,totalAmountCart}=useSelector((state:RootState)=>state.cart)

const [modePaiement,setModePaiement]=useState<string>('cash')



//Mapping data the cart
 const dataCart=products.map(({images,quantityCart,sizeCart})=>(
 {images,quantityCart,sizeCart}
 ))


// generate Order Number
const generieNumOrder = () => {
  const timetemp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timetemp}-${random}`
}

 //console.log('numberOrde==========>',generieNumOrder());
 //console.log('dataCart============>',dataCart)
const [dataForm,setDataForm]=useState<typeFormFraisLivraison>({username:'',email:'',ville:'',typeLivraison:'',telephone:'',adress:'',sousTotal:0,fraisLivraison:0,total:0,typePaiement:'cash',dataCart:dataCart,numberOrder:generieNumOrder()})

const [loadingCash,setLoadingCash]=useState<boolean>(false)



//la mise à jour de l'état indexDataFraisLivraison et valueTypeLiveraison
useEffect(() => {
 
   // if (typeof window !== 'undefined') {   
    if (user &&(indexDataFaisLivraison !== null || valueTypeLiveraison!==null)) {
      
      const frais = frais_livraison(indexDataFaisLivraison);
      const total = totaleAmountPlusLivraison(indexDataFaisLivraison);

      setDataForm((prev) =>{

      const newData= {...prev,
            username:user.user?.fullName||"",
            email:user.user?.primaryEmailAddress?.emailAddress||"",
            fraisLivraison: frais||0,
            sousTotal:totalAmountCart||0,
            total: total||0,
            typePaiement:modePaiement,
            typeLivraison:DataFraisLivraison[0][parseInt(valueTypeLiveraison)]||"" }
         // Si les nouvelles valeurs sont différentes de l'état actuel, on les met à jour
         if (JSON.stringify(newData) !== JSON.stringify(prev)) {
            return newData
          }
  
          return prev // Si les valeurs sont identiques, on retourne l'état précédent
     
        }
        
    
    
    );

     // console.log("valueTypeLiveraison",valueTypeLiveraison)
        //   setDataForm((prev)=>({...prev,
    //     username:user.user?.fullName,
    //     email:user.user?.primaryEmailAddress?.emailAddress,
    //     typeLivraison:DataFraisLivraison[0][parseInt(valueTypeLiveraison)],
    //     sousTotal:totalAmountCart,
    //     fraisLivraison:frais,
    //     total:total,
    // }))
  
    }
   
    // }else{
    //     console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
      
    // }
    // // if(!user){
    //     return 
    // }

  }, [user,indexDataFaisLivraison,valueTypeLiveraison]); //


 

const handlerChange=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
    
       
    const {name,value}=e.target
    const frais=frais_livraison(indexDataFaisLivraison);
    const total=totaleAmountPlusLivraison(indexDataFaisLivraison)
      if(name==='ville' || name==='telephone' || name==='adress'){
         
   
        console.log('IndexDataFraisLivraison==>',indexDataFaisLivraison)
        
         setDataForm((prev)=>({...prev,
            username:user.user?.fullName,
            email:user.user?.primaryEmailAddress?.emailAddress,
            typeLivraison:DataFraisLivraison[0][parseInt(valueTypeLiveraison)],
            sousTotal:totalAmountCart,
            fraisLivraison:frais,
            typePaiement:modePaiement,
            total:total,
            [name]:value}))

        // setDataForm((prev) =>{

        //     const newData= {...prev,
        //           username:user.user?.fullName||"",
        //           email:user.user?.primaryEmailAddress?.emailAddress||"",
        //           fraisLivraison: frais||0,
        //           sousTotal:totalAmountCart||0,
        //           total: total||0,
        //           typeLivraison:DataFraisLivraison[0][parseInt(valueTypeLiveraison)]||"",
        //           [name]:value }
        //        // Si les nouvelles valeurs sont différentes de l'état actuel, on les met à jour
        //        if (JSON.stringify(newData) !== JSON.stringify(prev)) {
        //           return newData
        //         }
        
        //         return prev
        //     })
     
     
        }
       
        


      
        // setDataForm((prev)=>({...prev,
        //     username:user.user?.fullName,
        //     email:user.user?.primaryEmailAddress?.emailAddress,
        //     typeLivraison:DataFraisLivraison[0][parseInt(valueTypeLiveraison)],
        //     sousTotal:totalAmountCart,
        //     fraisLivraison:frais,
        //     total:total,
        //     [name]:value}))
        
    
 } 


const createOrder=async(data:typeFormFraisLivraison)=>{
    
    try{
        
        const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ordercaches`,{
        method:"POST",
        headers:{
            
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({data})
        
    })
    

        if(!res.ok){
            throw new Error(`Http://status${res.status}`)
        }
        
        const responsDate=await res.json()
        return responsDate
        
        
       
    
}catch(error){
console.log('error',error)
}  


}

//handler Cash Paiement 
const handlerCashPaiement=async()=>{

try{
    setLoadingCash(true)
    await createOrder(dataForm)
    dispatch(removeCart())
    router.replace(`${process.env.NEXT_PUBLIC_URLL}/paymentsuccess`)
        
}catch(error){
  console.log('error',error)
  
}finally{
  setLoadingCash(false)
}





}
//handler Credit Paiement
const handlerCreditPaiement=async()=>{

    
/**************************************************************** */

if (!stripe || !elements) {
  // Stripe.js hasn't yet loaded.
  // Make sure to disable form submission until Stripe.js has loaded.
  return;
}


// creation The ordre and remove information the cart 



const { error: submitError } = await elements.submit();
console.log('submitErroer :',submitError?.message)
if (submitError) {
  // handleError(submitError);
  return;
}
//setLoadingCash(true)
 const total=totaleAmountPlusLivraison(indexDataFaisLivraison)??0
  console.log('ttttttttttttota:',total)

const data_amount = {
  amount: total*100,
  currency: "usd"

}


const res = await fetch("api/create-intent", {

  method: "POST",
  headers: {
      "Content-Type": "application/json",

  },
  body: JSON.stringify(data_amount)

})

const data = await res.json();
console.log('data the fetch api payennt ',data)
if (!data.clientSecret) {
  throw new Error('Client secret not returned');
}

   await createOrder(dataForm)
   dispatch(removeCart())
  // setDisableFaShoppingCart(false)
   // setLoadingCash(false)
  // setLoadingCash(true) 
const { error:comfirmError } = await stripe.confirmPayment({
  elements,
  clientSecret: data.clientSecret,
  confirmParams: {
    
      return_url: `${process.env.NEXT_PUBLIC_URLL}/paymentsuccess`,
  },
});

if(!comfirmError){
  throw comfirmError
}






//setLoadingCash(false)
/***************************************************************** */
  

// }catch(error){
//   console.log('Probleme de paiement ==>',error)
//  // setLoadingCash(false)
 
// }finally{
//   setLoadingCash(false)
// }
     







}
//
const  handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()

 if(modePaiement==='cash'){

  await handlerCashPaiement()

 }

 else if(modePaiement==='credit'){

 
  try{ 
    setLoadingCash(true)  
    await handlerCreditPaiement() 

  }catch(error){
    console.log('le paiement ca pas fonctionne',error)
  }finally{
    setLoadingCash(false)
  }
   
 
  
  
 
        
 }


 


}


 //console.log('dataFromlll:',dataForm)

// if(loadingCash){
//   return(
//     <div className='relative w-full min-h-screen flex justify-center items-center border-4 border-solid border-red-700  opacity-100' >
//        <div className='absolute  border-4 border-solid border-blue-600  ' >
//           <h1><Loading1 /></h1>
//       </div>
//       </div>
//   )

// }

// console.log('JSON.stringify({data})',JSON.stringify({dataForm})) 
    return (
  
    
       <div className='w-full h-full border-0 border-green-800 border-solid ' > 
         
         
         <form   onSubmit={handleSubmit} className="w-full h-full flex  flex-col justify-start items-center gap-4 border-0 border-solid border-blue-500 ">
                   {/*******************************  full Name *****************************/}
                   <input className="w-full h-10 border-2 rounded-md border-solid border-gray-600" 
                           onChange={handlerChange} name='username' value={dataForm.username??''} type="text" placeholder="Full Name" />
                   {/* *************************** Adress Email ************************** */}
                   <input className="w-full h-10 border-2 rounded-md border-solid border-gray-600 "
                          onChange={handlerChange} name='email' value={dataForm.email??''} type="text" placeholder="Adress Email"   />
                   
                   {/* *************************** List the wilaya ************************** */}
                   <select className=" w-full h-10  rounded-md border-2 border-solid border-gray-600 " 
                          //  style={{transition:'max-height 0.3s ease-in-out',maxHeight:'300px',overflowY:'auto'}}
                      
                       onChange={(e)=>{handlerChange(e);handlerList(e)}}  name="ville" 
                                
                      >
                   
                       {Array.isArray(DataFraisLivraison) && DataFraisLivraison.length >0 ?
                       
                      ( DataFraisLivraison.map((item:string,index:number)=>( 
                                                                                                               //value={item[parseInt(valueTypeLiveraison) 
                           <option className={`text-xl bg-[var(--secondary-color)] ${index===0?'text-center': 'text-start'}`} key={index}  value={item[1]}>{item[1]}</option>
                       ))):( <option disabled>Aucune donnée disponible</option>)}
               
                   </select>
                
                    {/*********************** value the list *********************/}
                   <input className="w-full h-10 border-2 rounded-md border-solid border-gray-600" 
                           onChange={handlerChange} name='ville11' value={dataForm.ville} type="text" placeholder="" />
                   {/* **************************** type of delivery select Button Radio **************************** */}
                   <div className="w-full px-2 py-2  flex flex-col  items-start gap-3 rounded-md border border-solid border-gray-600 " >
                           <label className="text-md capitalize pb-1 border-b-2 border-solid border-b-gray-600"  > type of delivery: </label>   
                           <div className="w-full  flex justify-start items-center gap-5 ">     
                                   <input type="radio" name={DataFraisLivraison[0][2]} value="2" onChange={(e)=>{handlerBtnRadio(e);handlerChange(e)}} checked={valueTypeLiveraison==="2"} />
                                   <label> {DataFraisLivraison[0][2]} : <span className="font-bold" >{indexDataFaisLivraison?'$'+convertirFraisLivrisonInumber(DataFraisLivraison[`${indexDataFaisLivraison}`]['2']):''}</span></label> 
                           </div>
                           <div className="w-full  flex justify-start items-center gap-5 ">
                               <input type="radio" name={DataFraisLivraison[0][4]} value="4" onChange={(e)=>{handlerBtnRadio(e);handlerChange(e)}} checked={valueTypeLiveraison==="4"}  />
                               <label> {DataFraisLivraison[0][4]} : <span className="font-bold">{indexDataFaisLivraison?'$'+convertirFraisLivrisonInumber(DataFraisLivraison[`${indexDataFaisLivraison}`]['4']):''}</span></label>
                           </div>
                   </div> 
                  
                  {valueTypeLiveraison==="4" && (<input type="text"  onChange={handlerChange}  name='adress' value={dataForm.adress}
                         placeholder='Number Rue,Appartemt,code Postal'
                         className="w-full h-10 border-2 border-solid rounded-md border-gray-600" />
                        
                      )}
                   <input className="w-full h-10 border-2 border-solid rounded-md border-gray-600 mt-2" 
                          onChange={handlerChange} name='telephone' value={dataForm.telephone} type="text" placeholder="Telephone" />
                  
                      
                 
                  {/*********************** Mode de paiement *********************/}  
                
                  <div className='w-full h-full mb-4  rounded-md border-2 border-solid border-black' >
                    <ModePaiement modePaiement={modePaiement} setModePaiement={setModePaiement} />
                  </div>  
                  
                  {loadingCash && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <Loading1 />
                </div>
                     )}

                <button type='submit' className="w-full h-10 text-gray-600 bg-green-600 border-2 border-solid rounded-md border-green-600 hover:scale-y-105" > Paiment </button>
              
               
                  
         </form>
       </div> 
      
  )
}

export default FormFraisLivraison

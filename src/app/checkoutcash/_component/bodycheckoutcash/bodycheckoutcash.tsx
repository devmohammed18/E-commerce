'use client'

import { RootState } from "@/app/util/redux/strore";

import React, {useState} from "react"
import { useSelector } from "react-redux";
import Image from "next/image";
import FormFraisLivraison from "../formcheckoutcash/formcheckoutcash";
import { Elements,} from '@stripe/react-stripe-js'

//StripeElementsOptions 
import { loadStripe,StripeElementsOptions} from '@stripe/stripe-js'

export interface typeFraisLivraison{
    DataFraisLivraison:string[],
    valueTypeLiveraison:string,
  
    indexDataFaisLivraison:number,
    convertirFraisLivrisonInumber:(value:string)=>number,
    handlerBtnRadio:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    handlerList:(e:React.ChangeEvent<HTMLSelectElement>)=>void,
    totaleAmountPlusLivraison:(indexDataFaisLivraison:number)=>number|undefined
    frais_livraison:(indexDataFaisLivraison:number)=>number|undefined
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
function FraisLivraison({DataFraisLivraison}:{DataFraisLivraison:string[]}) {

 


    
    const [indexDataFaisLivraison,setIndexDataFraisLivraison]=useState<number>(0)// la position de la ligne de table DataFraisLivraison (fichier xlsl de livraison) 
    //type '2'=livraison au bueau and type'4'=== livraison a domicile
    const [valueTypeLiveraison,setValueTypeLiveraison]=useState<string>("2") //Position te collon the table table DataFraisLivraison (fichier xlsl de livraison) ('2'is position the Livraison au Bureau)
    //const [nameTypeLivraison,setNameTypeLivraison]=useState<string>('Livraison au Bureau')
    const {products,totalAmountCart}=useSelector((state:RootState)=>state.cart)
    
  

    // function for select value the button Radio (type livraison)
    const handlerBtnRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        
      //  if(indexDataFaisLivraison){
            const {value}=e.target
            
            setValueTypeLiveraison(value); // Mettez à jour l'état avec la valeur sélectionnée du bouton radio  
            // setNameTypeLivraison(name);
             console.log('apre :::::::::',valueTypeLiveraison)
            // console.log('nameTypeLivraison   :::::::::',nameTypeLivraison)
     //  }
     
    };
    
    // function for select distination (wilaya) for delever the commande 
    const handlerList=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        const {name,value}= e.target
        console.log('value----->List==>',value)
        console.log('name----->Liste==>',name)
     //       if(value){
            const index=DataFraisLivraison.findIndex((item)=>item[1]===value )
            console.log("index",index)  
            setIndexDataFraisLivraison(index)
           // console.log('indexDataFaisLivraison',indexDataFaisLivraison)
      //  }
        
            console.log('liste e.target :',e.target.name)
    }

  
    //function calcul the total =totaleAmountCart+FraisLivraison
    const totaleAmountPlusLivraison=(indexDataFaisLivraison:number)=>{

        if(indexDataFaisLivraison===0){
            return totalAmountCart
        }
        if(valueTypeLiveraison==='2'){
            return totalAmountCart+convertirFraisLivrisonInumber(DataFraisLivraison[`${indexDataFaisLivraison}`]['2']);
        
        }else if(valueTypeLiveraison==='4'){
            return totalAmountCart+convertirFraisLivrisonInumber(DataFraisLivraison[`${indexDataFaisLivraison}`]['4']);
        }

    }

    // function show le montant de chaque type de de livraison 
    const frais_livraison=(indexDataFaisLivraison:number)=>{
        
        if(indexDataFaisLivraison===0 ){
            return 0
        }

        if(valueTypeLiveraison==='2'){
            return convertirFraisLivrisonInumber(DataFraisLivraison[`${indexDataFaisLivraison}`]['2'])
        }else if(valueTypeLiveraison==='4'){
        return convertirFraisLivrisonInumber(DataFraisLivraison[`${indexDataFaisLivraison}`]['4'])

        }


    }
   

    //function keep number and remplece string in espace exemle :500 DA ==>500 
    // and convertir  the fais livraison from string to number
    const convertirFraisLivrisonInumber=(value:string)=>{

        if(value){
            const frais_livraison=value.replace(/[^\d]/g, '')
            const frais_livraison_convert=parseInt(frais_livraison)

            return frais_livraison_convert
        }else{
            return 0
        }

    }

    // useEffect(()=>{
    //     console.log('indexDataFaisLivraison (avant mise à jour) :', indexDataFaisLivraison);
    //     if(indexDataFaisLivraison){
    //        console.log('indexDataFaisLivraison (après mise à jour) :', indexDataFaisLivraison);
    //     }
       
    //    },[indexDataFaisLivraison])
   
const options:StripeElementsOptions= {
        mode: 'payment',
        currency: 'usd',
        amount: 100*100,
       
      };

     
      
    //   if(!DataFraisLivraison || !DataFraisLivraison[0] ){

    //     return (
    
    //         <div className="w-full h-screen flex justify-center items-center">
    //           No Delivery Data Available
    //         </div>
    //     )
    
    //    }

    return (
          
    <div className=" sm:flex sm:flex-col-reverse sm:items-center w-full min-h-screen px-6 flex justify-start items-start gap-3 border-2 border-solid border-red-700 " >
       
         {/* details frais livreson and frais paiement */}
        <section className=" sm:w-full md:w-1/2  w-3/5 h-full flex  flex-col justify-start items-start gap-4 border-0 border-solid border-gray-600 p-4 " >
            {/*                         title détails de la livraison             */}
           <div className="text-xl pb-3 border-b-2 border-solid border-b-gray-600 capitalize " >delivry details</div>
           {/* Information de client (adress email ,la ville ,...) */}
           <div className="w-full min-h-full ">
             {/* form  */}

             <Elements stripe={stripePromise} options={options} >  
                <FormFraisLivraison  indexDataFaisLivraison={indexDataFaisLivraison} valueTypeLiveraison={valueTypeLiveraison}  
                DataFraisLivraison={DataFraisLivraison} convertirFraisLivrisonInumber={convertirFraisLivrisonInumber} handlerList={handlerList} 
                handlerBtnRadio={handlerBtnRadio} frais_livraison={frais_livraison} totaleAmountPlusLivraison={totaleAmountPlusLivraison}  />
            </Elements>

          
           </div>
        </section>
       
         {/* details the facture */}
      <section className="sm:w-full md:w-1/2 w-2/5  flex flex-col items-start gap-3 rounded-md border-0 border-sold border-gray-600 p-4 ">
            {/*************************** information the Cart *****8*********************/}
              
                {/*                         title your commande          */}
               <div className="text-xl pb-3 border-b-2 border-solid border-b-gray-600 capitalize " >your commande</div>
               <div className="w-full p-4 rounded-md border border-sold border-gray-600   ">

                    <ul className="space-y-4 border-0 boredr-solid border-red-700">
                            
                            {products && products.map(({title_pro,sizeCart,images,quantityCart },index:number)=>(
                                
                                <div key={index}  className='flex-col justify-between items-start gap-3 border-0 border-solid border-red-700 ' >
                                    <li className="flex items-start gap-4">
                            {/**************************** image the product ***********************/}
                                    <div className='w-28 h-24 border-2 border-solid border-red-600'>
                                    <Image
                                        src={images[0].url_image[0].url}
                                        height={100}
                                        width={100}
                                        alt=""
                                        // size-16
                                        className="w-full h-full rounded object-cover"
                                    />
                                    </div>

                            {/***************************** information the product ********************/}
                                    <div className=' space-y-5 border-0 border-solid border-red-700' >
                                        {/*                      title the product              */}
                                        <h3 className="text-gl  text-gray-900">{title_pro}</h3>
                                        {/*     size and price and Quantity the product            */}
                                        <dl className="text-sm mt-0.5 space-y-2  text-gray-600 ">
                                            
                                            <div >
                                            <dt className="inline">Size:</dt>
                                            <dd className="inline">{sizeCart}</dd>
                                            </div>

                                            <div>
                                            <dt className="inline">Price:</dt>
                                            {images[0].promotion_active && <dd className="inline">${images[0].promotion_price}</dd>}
                                            <dd className={`inline ${images[0].promotion_active?'line-through text-red-600 ml-2':''}`}>
                                                <span className="text-gray-600">${images[0].price}</span>
                                            </dd>
                                            {images[0].promotion_active && <dd className="inline ml-2">
                                              <span className="text-green-600"> {images[0].promotion_percentage}% Off</span> 
                                            </dd>}
                                            </div>
                                            
                                            {/******************************  Button Couter Quantity  ***********************/}
                                            
                                            {/* <div className='w-max'>
                                                <BtncounterQuantity width={35} height={30} id={id} title_pro={title_pro} desc_pro={desc_pro} images={images} priceCart={priceCart} sizeCart={sizeCart} quantityCart={quantityCart} />
                                            </div> */}


                                        </dl>
                                    </div>
                                
                                    {/*                    totals amount for each Product            */}
                                    <div className="flex flex-1 items-center justify-end gap-2">
                                    
                                    <span className='w-7 text-md font-semibold border-b-2 border-solid border-black ' >
                                        ${quantityCart*(images[0].promotion_active?images[0].promotion_price:images[0].price)}
                                    </span>

                                    </div>
                                    
                                    

                                    </li>
                                    {/***************************Counter the Quantite *****************************  */}
                                    

                                </div>

                            )) }

                    </ul>

                    {/****************************Total Amount the Cart ********************************/}
                    <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                            <div className="w-screen max-w-lg space-y-4">
                            <dl className="space-y-0.5 text-md font-semibold text-gray-700">
                                <div className="flex justify-between">
                                <dt >Subtotal</dt>
                                <dd>${totalAmountCart}</dd>
                                </div>

                                {/* <div className="flex justify-between">
                                <dt>VAT</dt>
                                <dd>0</dd>
                                </div> */}

                                <div className="flex justify-between">
                                <dt>Livraison</dt>
                                <dd>${frais_livraison(indexDataFaisLivraison)}</dd>
                                </div>
                                
                                <div className="flex justify-between  text-md font-semibold pb-6 ">
                                <dt>Total</dt>
                                <dd>${totaleAmountPlusLivraison(indexDataFaisLivraison)}</dd>
                                </div>
                            </dl>
  
                            {/* <div className="flex justify-end">
                                <span
                                className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
                                >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="-ms-1 me-1.5 size-4"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                                    />
                                </svg>

                                <p className="whitespace-nowrap text-xs">2 Discounts Applied</p>
                                </span>
                            </div> */}
                            
                            
                            </div>
                    </div>

              </div> 
       </section> 
    </div>
  )
}

export default FraisLivraison

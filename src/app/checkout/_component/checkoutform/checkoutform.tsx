'use client'

import { useState } from 'react';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { RootState } from '@/app/util/redux/strore';
import { useDispatch, useSelector } from 'react-redux';
//import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Loading1 from '@/app/_component/loading/loading';
import { removeCart } from '@/app/util/redux/reduce';




const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    //const [setErrorMessage] = useState();
    const [loading, setLoading] = useState<boolean>(false);

    const { products, totalAmountCart } = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()
    // const router= useRouter()
    const { user } = useUser()
    //Send Email 
    const sendEmail = async (numOrder: string, dateOrder: string) => {
        const dataEmail = {
            email: user?.primaryEmailAddress?.emailAddress,
            products: products,
            num_order: numOrder,
            date_order: dateOrder,
            amount: totalAmountCart
        }
        console.log(dataEmail)


        try {

            const res = await fetch('api/sendEmail', {

                method: 'POST',
                headers: {
                    //Authorization:`Bearer ${process.env.RESEND_API_KEY}`,
                    Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataEmail)
            })
            console.log('ooooooooooooooooooooooooooooooooooooooooooo')
            if (!res.ok) { throw new Error(`http send emait status!! : ${res.status}`) }

            console.log('--------->Messge Email Send with seccess !!!')


        } catch (error) {
            console.log(`Error Send Email For Connfermation The Order: ${error} `)
        }


    }

    //creation Number Order
    const generieNumOrder = () => {

        const timetemp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `ORD-${timetemp}-${random}`
    }

    //create Order
    const createOrder = async () => {


        const NumOrder = generieNumOrder()
        const DateOrder = new Date().toISOString()
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@ Order @@@@@@@@@@@@@@@@@@@@@@@@@@')
        console.log(generieNumOrder())
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@ Order @@@@@@@@@@@@@@@@@@@@@@@@@@')

        const dataCart = products.map(({ images, quantityCart, sizeCart }) =>
        ({

            images,
            quantityCart,
            sizeCart,
        })


        )


        console.log('fullname', user?.fullName)
        console.log('adress: ', user?.primaryEmailAddress?.emailAddress)
        console.log('amount :', totalAmountCart)
        const data = {
            data: {
                username: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                amount: totalAmountCart,
                dataCart: dataCart,
                num_order: NumOrder,
                date_order: DateOrder,
            }
        }
        console.log(data)


        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
                method: 'POST',
                headers: {

                    Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)

            })
            if (!res.ok) { throw new Error(`HTTP Error!status : ${res.status} `) }
            const respons = await res.json()
            console.log('------>', respons.message)
            sendEmail(NumOrder, DateOrder)
            //console.log(`Http : status: ${res.status}`)
            return respons

        } catch (error) {
            console.log('http error:', error)
        }

    }





    //   const handleError = (error) => {
    //     setLoading(false);

    //    setErrorMessage(error.message);
    //   }



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        

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
            setLoading(true);
       

        const data_amount = {
            amount: totalAmountCart * 100,
            currency: "usd"

        }


        const res = await fetch("api/create-intent", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(data_amount)

        })
        // Log the response status and body for debugging
        //console.log('Response Status:', res.status);
        //  console.log('res=====>:', res);
        // const text = await res.text(); // Try getting the raw text first
        // console.log('Response Body:', text);
        //const {client_secret: clientSecret} = await res.json();
        const data = await res.json();
        console.log('data the fetch api payennt ',data)
        if (!data.clientSecret) {
            throw new Error('Client secret not returned');
        }

            createOrder()
            dispatch(removeCart())
            
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret: data.clientSecret,
            confirmParams: {
              
                return_url: `${process.env.NEXT_PUBLIC_URLL}/paymentsuccess`,
            },
        });

        
            
        

       console.log('Error de confermation',error)
        if (error) {
            // This point is only reached if there's an immediate error when
            // confirming the payment. Show the error to your customer (for example, payment details incomplete)

            // handleError(error);
             console.log('operation n ai pas fonctionne!!!!')
        } else {
            console.log('operation n ai pas fonctionne!!!!')
           
            
            // Your customer is redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer is redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }



    };//end handleSubmit




    return (

        loading ?

            <form onSubmit={handleSubmit} className='relative' >
                <PaymentElement />
                <button type="submit" className='w-full h-10 bg-black mt-4 text-white payment rounded-md '>pay ${totalAmountCart}</button>
                <div className='absolute top-0 bottom-0 left-0 right-0 text-center flex items-center justify-center  opacity-65' ><h1><Loading1 /></h1></div>
            </form>

            :
            (<form onSubmit={handleSubmit}>
                <PaymentElement />
                <button type="submit" className='w-full h-10 bg-black mt-4 text-white payment rounded-md '>pay ${totalAmountCart}</button>
            </form>)

    );

};

export default CheckoutForm;
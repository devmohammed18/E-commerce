

// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe, StripeElementsOptions} from '@stripe/stripe-js';
// import CheckoutForm from './_component/CheckoutForm';
import CheckoutBody from "./_component/checkoutbody/checkoutbody"




// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// type typeSearchParams=Promise<{amount:number}>
// {searchParams}:{searchParams:typeSearchParams}
 function CheckOut() {

// const {amount}= use (searchParams)
// console.log("searchParams :",amount)

  // const options:StripeElementsOptions= {
  //   mode: 'payment',
  //   currency: 'usd',
  //   amount: 100*100,
   
  // };
 
  return (
    <div className='w-full min-h-screen mt-[60px] mb-1 p-6 flex flex-wrap justify-around gap-y-5 items-center bg-white border border-solid border-black  ' >
      <CheckoutBody />
     {/* <Suspense fallback={<div>Laoding ....</div>} > */}
     {/* <Elements stripe={stripePromise} options={options}>
         <CheckoutForm />
    </Elements> */}
    {/* </Suspense> */}
    </div>
  )
}

export default CheckOut

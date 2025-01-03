'use client'
import {Elements} from '@stripe/react-stripe-js';

import {loadStripe, StripeElementsOptions} from '@stripe/stripe-js';
import CheckoutForm from '../checkoutform/checkoutform';
import { Suspense } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
function CheckoutBody() {

    const options:StripeElementsOptions= {
        mode: 'payment',
        currency: 'usd',
        amount: 100*100,
       
      };

  return (
    <Suspense fallback={<div>Loading... </div>} >
      <Elements stripe={stripePromise} options={options}>
         <CheckoutForm />
      </Elements>
      </Suspense>
    
  )
}

export default CheckoutBody

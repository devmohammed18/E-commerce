import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialiser Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
 // apiVersion: "2024-11-20.acacia", // Assurez-vous que la version de l'API Stripe est correcte
});

export async function POST(req: NextRequest) {
  try {

    console.log("ooooooooooooooooooooooooooooooooo")
    // Récupérer les données du corps de la requête
    const { amount, currency } = await req.json();

    // Vérifier si 'amount' et 'currency' sont présents
    if (!amount || !currency) {
      return NextResponse.json({ error: 'Amount and currency are required' }, { status: 400 });
    }

    // Créer un PaymentIntent avec Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,   // Le montant en centimes
      currency, // La devise (par exemple, 'usd', 'cad', etc.)
    });

    // Retourner le client_secret de Stripe
    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la création du PaymentIntent :', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
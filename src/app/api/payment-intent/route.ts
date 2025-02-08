import { NextResponse , NextRequest } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export async function POST(request: NextRequest) {
    try {
        const { amount } = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({     //built in methoth of stype is "paymentintent.create"
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            // automatic_payment_methods: ['card_present'], 
        })

        return NextResponse.json({ 
            clientSecret: paymentIntent.client_secret ,
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
            status: paymentIntent.status
        })
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({
                status: 500,
                body: { error: err.message }
            })
        }
    }
}


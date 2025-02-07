import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export async function POST(req: Request) {
    const rawBody = await req.text(); 
    const sig = req.headers.get("stripe-signature");
  
    try {
      // ✅ Webhook سے Event نکالیں
      const event = stripe.webhooks.constructEvent(
        rawBody,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
  
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
  
        // ✅ User Data نکالیں
        const orderId = paymentIntent.id;  // Payment ID (Order ID کے طور پر)
        const amount = paymentIntent.amount / 100;  // Amount in USD
        const userId = paymentIntent.metadata.userId || "No User ID"; 
        const userName = paymentIntent.metadata.userName || "Guest";
  
        console.log("✅ Payment Successful!");
        console.log("📌 Order ID:", orderId);
        console.log("📌 Amount:", amount, "USD");
        console.log("📌 User ID:", userId);
        console.log("📌 User Name:", userName);
  
        // 📝 Database میں Save کریں (اگر ضروری ہو)
      }
  
      return NextResponse.json({ received: true });
    } catch (err) {
      console.error("❌ Webhook Error:", err);
      return NextResponse.json({ error: "Webhook error" }, { status: 400 });
    }
  }
  
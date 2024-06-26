import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/db";

import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signature = headers().get('stripe-signature');
    if (!signature) {
      return new Response('Invalid signature', { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === 'checkout.session.completed') {
      if (!event.data.object.customer_details?.email) {
        throw new Error('Missing user email');
      }

      const session = event.data.object as Stripe.Checkout.Session;

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null
      };
      if (!userId || !orderId) {
        throw new Error('Invalid request metadata');
      }

      await db.order.update({
        where: { id: orderId },
        data: { isPaid: true }
      });

      // TODO: send message to email user
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      message: 'Something went wrong',
      ok: false
    }, {
      status: 500
    })
  }
}
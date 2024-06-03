'use server';

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { stripe } from "@/lib/stripe";

import type { ProductStorage } from "@/components/home/CardProduct";

import { db } from "@/db";

export const createCheckoutSession = async (products: ProductStorage[]) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error('You need to be logged in');
  }

  const totalPrice: number = products.reduce((total, curr) => total + curr.amount, 0) || 0;
  const qty: number = products.reduce((total, curr) => total + curr.total, 0) || 0;
  const orderItems = products.map((item) => ({
    amount: item.amount,
    total: item.total,
    productId: item.product.id,
  }));

  const order = await db.order.create({
    data: {
      amount: totalPrice,
      total: qty,
      isPaid: false,
      orderItems: {
        createMany: {
          data: orderItems
        }
      }
    }
  })

  // STRIPE
  const createProductPromises = products.map(({ product }) => {
    return stripe.products.create({
      name: product.title,
      images: product.images.map(value => value.url),
      default_price_data: {
        currency: 'USD',
        unit_amount: product.price * 100,
      }
    })
  })
  const productsCreated = await Promise.all(createProductPromises);

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ['US', 'ID']
    },
    metadata: {
      userId: user.id,
      orderId: order.id
    },
    line_items: productsCreated.map((product) => {
      const quantity = products.find(({ product: currProduct }) => currProduct.title === product.name)?.total || 1;

      return {
        price: product.default_price as string,
        quantity
      }
    })
  })

  return { url: stripeSession.url }
}
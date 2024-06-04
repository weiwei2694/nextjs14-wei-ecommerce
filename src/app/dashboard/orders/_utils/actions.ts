'use server'

import { db } from "@/db"

import type { GetTotalColor, GetOrders } from "./types";

enum IsPaid {
  all = 'all',
  true = 'paid',
  false = 'not paid',
}

export const getTotalOrder = async (): Promise<GetTotalColor> => {
  const totalOrder = await db.order.count({});

  return totalOrder;
}

export const getOrders = async ({
  page = 1,
  per_page = 10,
  isPaid
}: {
  page?: number
  per_page?: number
  isPaid?: boolean
}): Promise<GetOrders> => {
  const skip = per_page * page;

  const orders = await db.order.findMany({
    where: {
      isPaid
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              title: true
            }
          }
        }
      }
    },
    skip,
    take: per_page
  });
  const totalOrder = await getTotalOrder();
  const hasNext = Boolean(totalOrder - skip - orders.length);

  return { data: orders, hasNext };
}
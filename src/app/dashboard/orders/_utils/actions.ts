'use server'

import { db } from "@/db"

import type { GetTotalColor, GetOrders } from "./types";

export const getTotalOrder = async (): Promise<GetTotalColor> => {
  const totalOrder = await db.order.count({});

  return totalOrder;
}

export const getOrders = async ({
  page = 1,
  per_page = 10
}: {
  page?: number
  per_page?: number
}): Promise<GetOrders> => {
  const skip = per_page * page;

  const orders = await db.order.findMany({
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
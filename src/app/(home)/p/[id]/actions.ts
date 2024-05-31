'use server';

import { db } from "@/db";

export const getProduct = async (id: string) => {
  const product = await db.product.findUnique({
    where: { id, images: { some: {} }, isArchived: false },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      images: true,
      color: true,
      size: true,
    },
  });

  return product;
}

export const getProductIsArchived = async (id: string) => {
  const product = await db.product.findUnique({
    where: { id, images: { some: {} }, isArchived: true }
  });

  return product;
}
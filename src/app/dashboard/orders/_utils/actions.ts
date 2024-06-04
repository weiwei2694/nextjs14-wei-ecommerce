'use server'

import { db } from "@/db"

import { GetTotalColor } from "./types";

export const getTotalOrder = async (): Promise<GetTotalColor> => {
  const totalOrder = await db.order.count({});

  return totalOrder;
}
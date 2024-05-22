'use server';

import { db } from "@/db";

import type { GetTotalCategory } from './types';

export const getTotalCategory = async (): Promise<GetTotalCategory> => {
  try {
    const totalCategory = await db.category.count();

    return totalCategory;
  } catch (err) {
    console.error(`[ERROR_DASHBOARD_GET_TOTAL_CATEGORY]: ${err}`);
  }
}
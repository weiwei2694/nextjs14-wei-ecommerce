'use server';

import { db } from "@/db";

import { GetSizes, GetTotalSize } from "./types";

export const getTotalSize = async (): Promise<GetTotalSize> => {
  try {
    const totalSize = await db.size.count();

    return totalSize;
  } catch (err) {
    console.error(`[ERROR_DASHBOARD_GET_TOTAL_SIZE]: ${err}`);
  }
}

export const getSizes = async ({
  page = 0,
  per_page = 10
}: {
  page?: number;
  per_page?: number;
}): Promise<GetSizes> => {
  try {
    const skip = per_page * page;

    const whereFilter = {
      skip,
      take: per_page
    }

    const sizes = await db.size.findMany(whereFilter);
    const totalCount = await db.size.count();
    const hasNext = Boolean(totalCount - skip - sizes.length);

    return { data: sizes, hasNext };
  } catch (err) {
    console.error(`[ERROR_DASHBOARD_GET_SIZES]: ${err}`);
  }
}
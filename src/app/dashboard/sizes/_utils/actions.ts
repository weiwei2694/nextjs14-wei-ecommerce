'use server';

import { db } from "@/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { revalidatePath } from "next/cache";

import type { GetSizes, GetTotalSize } from "./types";

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

export const saveSize = async ({
  name,
  value
}: {
  name: string;
  value: string;
}) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const existingSizeName = await db.size.findFirst({ where: { name } })
    if (existingSizeName) {
      return { success: false, message: 'Size name already exists.' };
    }

    const existingSizeValue = await db.size.findFirst({ where: { value } })
    if (existingSizeValue) {
      return { success: false, message: 'Size value already exists.' };
    }

    await db.size.create({
      data: {
        name,
        value,
      },
    });

    return { success: true };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/colors');
  }
}
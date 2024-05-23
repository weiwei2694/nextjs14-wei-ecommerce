'use server';

import { db } from "@/db";

import type { GetTotalCategory, IsNameExist, SaveCategory } from './types';

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { revalidatePath } from "next/cache";

export const getTotalCategory = async (): Promise<GetTotalCategory> => {
  try {
    const totalCategory = await db.category.count();

    return totalCategory;
  } catch (err) {
    console.error(`[ERROR_DASHBOARD_GET_TOTAL_CATEGORY]: ${err}`);
  }
}

export const saveCategory = async ({
  name
}: {
  name: string;
}): Promise<SaveCategory> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    await db.category.create({
      data: {
        name
      },
    });

    return { success: true };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/categories');
  }
}

export const isNameExist = async (name: string): Promise<IsNameExist> => {
  try {
    const existingName = await db.category.findFirst({
      where: { name }
    });

    return Boolean(existingName);
  } catch (err) {
    console.error(`[ERROR_IS_NAME_EXIST]: ${err}`);
  }
}
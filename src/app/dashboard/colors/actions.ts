'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { db } from '@/db';

import { revalidatePath } from 'next/cache';
import { SaveColor, GetTotalColor, GetColors } from './types';

export const saveColor = async ({ name, color }: { name: string, color: string }): Promise<SaveColor> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    await db.color.create({
      data: {
        name,
        color,
      },
    });

    return { success: true };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/colors');
  }
}

export const getTotalColor = async (): Promise<GetTotalColor> => {
  try {
    const totalColor = await db.color.count();

    return totalColor;
  } catch (err) {
    console.error(`[ERROR_DASHBOARD_GET_TOTAL_COLOR]: ${err}`);
  }
}

export const getColors = async (): Promise<GetColors> => {
  try {
    const colors = await db.color.findMany();

    return colors;
  } catch (err) {
    console.error(`[ERROR_DASHBOARD_GET_COLORS]: ${err}`);
  }
}
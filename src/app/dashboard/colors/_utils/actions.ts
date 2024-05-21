'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { db } from '@/db';

import { revalidatePath } from 'next/cache';

import type { GetColor, SaveColor, GetTotalColor, GetColors, DeleteColor } from './types';

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

export const getColor = async ({ id }: { id: string }): Promise<GetColor> => {
  try {
    const color = await db.color.findFirst({
      where: { id }
    });
    if (!color) {
      throw new Error('Color not found.');
    }

    return color;
  } catch (err) {
    console.error(`[ERROR_DASHBOARD_GET_COLOR]: ${err}`);
  }
}

export const deleteColor = async ({ id }: { id: string }): Promise<DeleteColor> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const existingColor = await db.color.findFirst({
      where: { id }
    });
    if (!existingColor) {
      throw new Error('Color not found.');
    }

    await db.color.delete({
      where: { id }
    });

    return { success: true }
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/colors');
  }
}

export const updateColor = async ({ id, name, color }: { id: string, name: string, color: string }) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const existingColor = await db.color.findFirst({
      where: { id }
    });
    if (!existingColor) {
      throw new Error('Color not found.');
    }

    const newColor = await db.color.update({
      where: { id },
      data: { name, color }
    })

    return { success: true, data: newColor };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/colors');
  }
}
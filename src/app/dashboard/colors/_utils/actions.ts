'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { db } from '@/db';

import { revalidatePath } from 'next/cache';

import type { GetColor, SaveColor, GetTotalColor, GetColors, DeleteColor, UpdateColor } from './types';

export const saveColor = async ({ name, color }: { name: string, color: string }): Promise<SaveColor> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const existingName = await db.color.findFirst({ where: { name } });
    if (existingName) {
      return { success: false, message: 'Name already exists.' };
    }

    const existingColor = await db.color.findFirst({ where: { color } });
    if (existingColor) {
      return { success: false, message: 'Color already exists.' };
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

export const getColors = async ({
  page = 0,
  per_page = 10
}: {
  page?: number;
  per_page?: number;
}): Promise<GetColors> => {
  try {
    const skip = per_page * page;

    const whereFilter = {
      skip,
      take: per_page
    }

    const colors = await db.color.findMany(whereFilter);
    const totalCount = await db.color.count();
    const hasNext = Boolean(totalCount - skip - colors.length);

    return { data: colors, hasNext };
  } catch (err) {
    console.error(`[ERROR_DASHBOARD_GET_COLORS]: ${err}`);
  }
}

export const getColor = async ({ id }: { id: string }): Promise<GetColor> => {
  try {
    const isCurrentColorExist = await db.color.findFirst({
      where: { id }
    });
    if (!isCurrentColorExist) {
      throw new Error('Color not found.');
    }

    return isCurrentColorExist;
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

    const isCurrentColorExist = await db.color.findFirst({
      where: { id }
    });
    if (!isCurrentColorExist) {
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

export const updateColor = async ({ id, name, color }: { id: string, name: string, color: string }): Promise<UpdateColor> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const isCurrentColorExist = await db.color.findFirst({
      where: { id }
    });
    if (!isCurrentColorExist) {
      throw new Error('Color not found.');
    }

    if (isCurrentColorExist.name !== name) {
      const existingName = await db.color.findFirst({ where: { name } });
      if (existingName) {
        return { success: false, message: 'Name already exists.' };
      }
    }

    if (isCurrentColorExist.color !== color) {
      const existingColor = await db.color.findFirst({ where: { color } });
      if (existingColor) {
        return { success: false, message: 'Color already exists.' };
      }
    }

    const newColor = await db.color.update({
      where: { id },
      data: { name, color }
    });

    return { success: true, data: newColor };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/colors');
  }
}
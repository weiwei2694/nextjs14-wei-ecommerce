'use server';

import { db } from "@/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { revalidatePath } from "next/cache";

import type { UpdateSize, GetSizes, GetTotalSize, SaveSize, DeleteSize, GetSize, IsValueExist, IsNameExist } from "./types";

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

export const getSize = async ({ id }: { id: string }): Promise<GetSize> => {
  try {
    const existingSize = await db.size.findFirst({
      where: { id }
    });
    if (!existingSize) {
      throw new Error('Size not found.');
    }

    return existingSize;
  } catch (err) {
    console.error(`[ERROR_DASHBOARD_GET_SIZE]: ${err}`);
  }
}


export const saveSize = async ({
  name,
  value
}: {
  name: string;
  value: string;
}): Promise<SaveSize> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    await db.size.create({
      data: {
        name: name.toLowerCase(), value: value.toUpperCase()
      },
    });

    return { success: true };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/sizes');
  }
}

export const deleteSize = async ({ id }: { id: string }): Promise<DeleteSize> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const existingSize = await db.size.findFirst({
      where: { id }
    });
    if (!existingSize) {
      throw new Error('Size not found.');
    }

    await db.size.delete({
      where: { id }
    });

    return { success: true }
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/sizes');
  }
}

export const updateSize = async ({
  id,
  name,
  value
}: {
  id: string;
  name: string;
  value: string;
}): Promise<UpdateSize> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const existingSize = await db.size.findFirst({
      where: { id }
    });
    if (!existingSize) {
      throw new Error('Size not found.');
    }

    const newSize = await db.size.update({
      where: { id },
      data: { name: name.toLowerCase(), value: value.toUpperCase() }
    });

    return { success: true, data: newSize };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/sizes');
  }
}

export const isNameExist = async (name: string): Promise<IsNameExist> => {
  try {
    const existingName = await db.size.findFirst({
      where: { name: name.toLowerCase() }
    })

    return Boolean(existingName);
  } catch (err) {
    console.error(`[ERROR_IS_NAME_EXIST]: ${err}`);
  }
}

export const isValueExist = async (value: string): Promise<IsValueExist> => {
  try {
    const existingValue = await db.size.findFirst({
      where: { value: value.toUpperCase() }
    });

    return Boolean(existingValue);
  } catch (err) {
    console.error(`[ERROR_IS_VALUE_EXIST]: ${err}`);
  }
}
'use server';

import { db } from "@/db";

import type { DeleteCategory, GetCategories, GetCategory, GetTotalCategory, IsNameExist, SaveCategory, UpdateCategory } from './types';

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { revalidatePath } from "next/cache";

import { utapi } from "@/lib/utapi";
import { getFileKey } from "@/lib/utils";

export const getTotalCategory = async (): Promise<GetTotalCategory> => {
  try {
    const totalCategory = await db.category.count();

    return totalCategory;
  } catch (err) {
    console.error(`[ERROR_DASHBOARD_GET_TOTAL_CATEGORY]: ${err}`);
  }
}

export const getCategories = async ({
  page = 0,
  per_page = 10
}: {
  page?: number;
  per_page?: number;
}): Promise<GetCategories> => {
  try {
    const skip = per_page * page;

    const whereFilter = {
      skip,
      take: per_page
    }

    const categories = await db.category.findMany(whereFilter);
    const totalCount = await db.category.count();
    const hasNext = Boolean(totalCount - skip - categories.length);

    return { data: categories, hasNext };
  } catch (err) {
    console.error(`[ERROR_DASHBOARD_GET_CATEGORIES]: ${err}`);
  }
}

export const getCategory = async ({
  id
}: {
  id: string
}): Promise<GetCategory> => {
  try {
    const existingCategory = await db.category.findUnique({
      where: { id }
    })
    if (!existingCategory) {
      throw new Error('Category not found.');
    }

    return existingCategory
  } catch (err) {
    console.error(`[ERROR_GET_CATEGORY]: ${err}`);
  }
}

export const saveCategory = async ({
  name,
  url,
  title
}: {
  name: string;
  url: string;
  title: string;
}): Promise<SaveCategory> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    await db.category.create({
      data: {
        name: name.toLowerCase(),
        billboard: url,
        title
      },
    });

    return { success: true };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/categories');
  }
}

export const deleteCategory = async ({
  id
}: {
  id: string
}): Promise<DeleteCategory> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const existingCategory = await db.category.findUnique({
      where: { id }
    });
    if (!existingCategory) {
      throw new Error('Category not found.');
    }

    return { success: true };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/categories');
  }
}

export const updateCategory = async ({
  id,
  name,
  url,
  title
}: {
  id: string;
  name: string;
  url: string;
  title: string;
}): Promise<UpdateCategory> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const existingCategory = await db.category.findUnique({ where: { id } });
    if (!existingCategory) {
      throw new Error('Category not found.');
    }

    if (url !== existingCategory.billboard) {
      const key = getFileKey(existingCategory.billboard);
      utapi.deleteFiles(key);
    }

    const newCategory = await db.category.update({
      where: { id },
      data: {
        name: name.toLowerCase(),
        billboard: url,
        title
      },
    });

    return { success: true, data: newCategory };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/categories');
  }
}

export const isNameExist = async (name: string): Promise<IsNameExist> => {
  try {
    const existingName = await db.category.findFirst({
      where: { name: name.toLowerCase() }
    });

    return Boolean(existingName);
  } catch (err) {
    console.error(`[ERROR_IS_NAME_EXIST]: ${err}`);
  }
}
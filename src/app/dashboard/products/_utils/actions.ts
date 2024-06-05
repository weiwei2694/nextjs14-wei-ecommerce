'use server';

import { db } from '@/db';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { revalidatePath } from 'next/cache';

import type { SaveProduct, GetTotalProduct, GetProducts, GetProduct, DeleteProductImage, UpdateProduct } from './types';

import type { Category, Color, Size } from '@prisma/client';

import { getFileKey } from '@/lib/utils';
import { utapi } from '@/lib/utapi';

export const getTotalProduct = async (): Promise<GetTotalProduct> => {
  try {
    const totalProduct = await db.product.count({});
    return totalProduct;
  } catch (err) {
    console.error(`[ERROR_GET_TOTAL_PRODUCT]: ${err}`);
  }
}

export const getProducts = async ({
  page = 0,
  per_page = 10,
  q,
}: {
  page?: number;
  per_page?: number;
  q?: string;
}): Promise<GetProducts> => {
  try {
    const skip = per_page * page;

    const whereClause: any = {};

    if (q) {
      const searchTerm = q.toLowerCase();

      whereClause.OR = [
        { title: { contains: searchTerm, mode: "insensitive" } }
      ]
    }

    const products = await db.product.findMany({
      include: {
        category: true,
        size: true,
        color: true,
        images: true,
      },
      skip,
      take: per_page,
      where: whereClause,
    });

    const totalCount = await db.product.count({ where: whereClause });
    const hasNext = Boolean(totalCount - skip - products.length);

    return { data: products, hasNext };
  } catch (err) {
    console.error(`[ERROR_GET_PRODUCTS]: ${err}`);
  }
};

export const getProduct = async ({
  id
}: {
  id: string;
}): Promise<GetProduct> => {
  try {
    const existingProduct = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        size: true,
        color: true,
        images: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    if (!existingProduct) {
      throw new Error('Product not found.');
    }

    return existingProduct;
  } catch (err) {
    console.error(`[ERROR_GET_PRODUCT]: ${err}`);
  }
}

export const saveProduct = async ({
  title,
  price,
  categoryId,
  colorId,
  sizeId,
  isFeatured,
  isArchived,
}: {
  title: string;
  price: string;
  categoryId: string;
  colorId: string;
  sizeId: string;
  isFeatured: boolean;
  isArchived: boolean;
}): Promise<SaveProduct> => {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser();
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const newProduct = await db.product.create({
      data: {
        title,
        price: Number(price),
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived
      }
    })

    return { data: newProduct, success: true };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/products');
  }
}

export const updateProduct = async ({
  id,
  title,
  price,
  categoryId,
  colorId,
  sizeId,
  isFeatured,
  isArchived,

  onlyUpdateImages,

  path
}: {
  id?: string;
  title?: string;
  price?: string;
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  isArchived?: boolean;

  onlyUpdateImages?: boolean;

  path?: string;
}): Promise<UpdateProduct> => {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser();
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    // If onlyUpdateImages is true, then we only have to revalidate the products page
    if (onlyUpdateImages) {
      revalidatePath('/dashboard/products');
      return { success: true };
    }

    const existingProduct = await db.product.findUnique({ where: { id } });
    if (!existingProduct) {
      throw new Error('Product not found.');
    }

    const newProduct = await db.product.update({
      where: { id },
      data: {
        title,
        price: Number(price),
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived
      }
    });

    return { success: true, data: newProduct };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath(path || '/dashboard/products');
  }
}

export const deleteProductImage = async ({
  id,
  url
}: {
  id: string;
  url: string;
}): Promise<DeleteProductImage> => {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser();
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const existingImage = await db.image.findUnique({ where: { id } });
    if (!existingImage || existingImage.url !== url) {
      throw new Error('Image not found.');
    }

    const key = getFileKey(url);
    await utapi.deleteFiles([key]);

    await db.image.delete({ where: { id } });

    return { success: true };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/products');
  }
}

export const getCategories = async (): Promise<Category[] | undefined> => {
  try {
    const categories = await db.category.findMany({});
    return categories;
  } catch (err) {
    console.error(`[ERROR_GET_CATEGORIES]: ${err}`);
  }
}

export const getColors = async (): Promise<Color[] | undefined> => {
  try {
    const colors = await db.color.findMany({});
    return colors;
  } catch (err) {
    console.error(`[ERROR_GET_COLORS]: ${err}`);
  }
}

export const getSizes = async (): Promise<Size[] | undefined> => {
  try {
    const sizes = await db.size.findMany({});
    return sizes;
  } catch (err) {
    console.error(`[ERROR_GET_SIZES]: ${err}`);
  }
}

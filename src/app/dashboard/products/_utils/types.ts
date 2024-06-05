import type { Category, Color, Image, Product as ProductPrisma, Size } from "@prisma/client";

export type GetTotalProduct = number | undefined;

export type Product = ProductPrisma & {
  category: Category,
  color: Color,
  size: Size,
  images: Image[]
}

export type GetProducts = {
  data: Product[];
  hasNext: boolean;
} | undefined

export type SaveProduct = {
  data: ProductPrisma;
  success: boolean;
};

export type GetProduct = Product | undefined;

export type DeleteProductImage = {
  success: boolean;
}

export type UpdateProduct = {
  success: boolean;
  data?: ProductPrisma;
};
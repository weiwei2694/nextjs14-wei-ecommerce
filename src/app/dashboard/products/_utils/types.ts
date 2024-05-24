import type { Category, Color, Product as ProductPrisma, Size } from "@prisma/client";

export type GetTotalProduct = number | undefined;

export type Product = ProductPrisma & {
  category: Category,
  color: Color,
  size: Size
}

export type GetProducts = {
  data: Product[];
  hasNext: boolean;
} | undefined

export type SaveProduct = {
  data: ProductPrisma;
  success: boolean;
};

export type DeleteProduct = {
  success: boolean;
}

export type GetProduct = Product | undefined;
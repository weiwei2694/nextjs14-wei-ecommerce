import type { Product } from "@prisma/client";

export type GetTotalProduct = number | undefined;

export type SaveProduct = {
  data: Product;
  success: boolean;
};
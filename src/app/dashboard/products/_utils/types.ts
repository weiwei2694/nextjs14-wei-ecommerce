import type { Product } from "@prisma/client";

export type SaveProduct = {
  data: Product;
  success: boolean;
};
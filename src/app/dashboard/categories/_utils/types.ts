import { Category } from "@prisma/client";

export type GetTotalCategory = number | undefined;

export type SaveCategory = {
  success: boolean;
}

export type IsNameExist = boolean | undefined;

export type GetCategories = {
  data: Category[];
  hasNext: boolean;
} | undefined

export type DeleteCategory = {
  success: boolean;
}

export type GetCategory = Category | undefined;

export type UpdateCategory = {
  data: Category;
  success: boolean;
}
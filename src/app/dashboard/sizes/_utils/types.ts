import { Size } from "@prisma/client"

export type GetTotalSize = number | undefined;

export type GetSizes = {
  data: Size[];
  hasNext: boolean;
} | undefined;

export type SaveSize = {
  success: boolean;
}

export type DeleteSize = {
  success: boolean;
};

export type GetSize = Size | undefined;

export type UpdateSize = {
  success: boolean;
  data: Size;
}

export type IsNameExist = boolean | undefined;

export type IsValueExist = boolean | undefined;
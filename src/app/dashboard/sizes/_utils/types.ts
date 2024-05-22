import { Size } from "@prisma/client"

export type GetTotalSize = number | undefined;

export type GetSizes = {
  data: Size[];
  hasNext: boolean;
} | undefined;

export type SaveSize = {
  success: boolean;
  message?: string;
}

export type DeleteSize = {
  success: boolean;
};

export type GetSize = Size | undefined;
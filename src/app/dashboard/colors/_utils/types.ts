import type { Color } from "@prisma/client";

export type SaveColor = {
  success: boolean;
};

export type GetTotalColor = number | undefined;

export type GetColors = {
  data: Color[];
  hasNext: boolean;
} | undefined;

export type GetColor = Color | undefined;

export type DeleteColor = {
  success: boolean;
};

export type UpdateColor = {
  success: boolean;
  data?: {
    id: string;
    name: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export type IsNameExist = boolean | undefined;

export type IsColorExist = boolean | undefined;
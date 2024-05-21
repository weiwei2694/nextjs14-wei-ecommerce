import type { Color } from "@prisma/client";

export type SaveColor = {
  success: boolean;
};

export type GetTotalColor = number | undefined;

export type GetColors = Color[] | undefined;

export type GetColor = Color | undefined;

export type DeleteColor = {
  success: boolean;
};
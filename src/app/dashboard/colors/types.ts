export type SaveColor = {
  success: boolean;
};

export type GetTotalColor = number | undefined;

export type GetColors = {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}[] | undefined;

export type DeleteColor = {
  success: boolean;
};
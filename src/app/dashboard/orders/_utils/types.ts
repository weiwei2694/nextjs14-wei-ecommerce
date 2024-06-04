import type { Order, OrderItem } from "@prisma/client";

export type GetTotalColor = number;

export type GetOrder = ({
  orderItems: ({
    product: {
      title: string;
    };
  } & OrderItem)[];
} & Order);

export type GetOrders = {
  data: GetOrder[];
  hasNext: boolean;
}
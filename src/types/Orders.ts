import { ReactNode } from "react";

export type OrderStatus =
  | "SORTING"
  | "WASHING"
  | "IRONING"
  | "FINISHED"
  | "DELIVERED";

export type IOrders = {
  id?: string;
  order_number: number;
  total: number;
  collect_date: string;
  delivery_date: string;
  customer: {
    id: string;
    name: string;
  } | null;
  phone_number: string | null;
  name: string | null;
  items: {
    id: string;
    name: string;
    quantity: number;
  }[];
  isDelivery: boolean;
  isNewCustomer: boolean;
  description: string;
  status: {
    id: number;
    name: OrderStatus;
  };
  address?: {
    zip_code: string;
    district: string;
    place_number: string;
    street: string;
    complement?: string;
  } | null;
};

export const statusSteps: { status: OrderStatus; label: string }[] = [
  { status: "SORTING", label: "Separando" },
  { status: "WASHING", label: "Lavando" },
  { status: "IRONING", label: "Passando" },
  { status: "FINISHED", label: "Finalizado" },
  { status: "DELIVERED", label: "Entregue" },
];

export type IOrderStatus = {
  SCREENING: { icon: ReactNode; label: string };
  WASHING: { icon: ReactNode; label: string };
  IRONING: { icon: ReactNode; label: string };
  FINISHED: { icon: ReactNode; label: string };
  DELIVERED: { icon: ReactNode; label: string };
};

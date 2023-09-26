import { Layout } from "@/components";
import { OrdersTemplate } from "@/components/Templates/Orders";
import { getOrders } from "@/firebase/http/Orders";
import { IOrders } from "@/types/Orders";
import { GetServerSideProps } from "next";

export type OrdersPageProps = {
  ordersData: IOrders[];
};

export default function OrdersPage({ ordersData }: OrdersPageProps) {
  return (
    <Layout>
      <OrdersTemplate ordersData={ordersData} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const ordersResponse = await getOrders();

  return {
    props: {
      ordersData: ordersResponse,
    },
  };
};
import { Layout } from "@/components";
import Calendar from "@/components/FullCalendar";
import { OrderDetailsModal } from "@/components/OrderDetails";
import { getOrders } from "@/firebase/http/Orders";
import { IOrders } from "@/types/Orders";
import { openModal } from "@/utils/handleModal";
import { GetServerSideProps } from "next";
import { useState } from "react";

export type OrdersPageProps = {
  ordersData: IOrders[];
};

export default function Agenda({ ordersData }: OrdersPageProps) {
  const [selectedOrder, setSelectedOrder] = useState<IOrders>();

  const handleSelectEvent = (id: string) => {
    const currentOrder = ordersData.find((order) => order.id === id);

    setSelectedOrder(currentOrder);

    openModal("orderDetailsModal");
  };
  return (
    <Layout>
      {selectedOrder && (
        <OrderDetailsModal defaultValues={selectedOrder as IOrders} />
      )}
      <Calendar
        handleSelectEvent={handleSelectEvent}
        initialEvents={ordersData.map((order) => {
          return {
            id: order.id,
            title: order.name ?? order.customer?.name,
            start: order.delivery_date,
            end: order.delivery_date,
          };
        })}
      />
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

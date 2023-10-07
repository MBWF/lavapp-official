import { Layout } from "@/components";
import Calendar from "@/components/FullCalendar";
import { OrderDetailsModal } from "@/components/OrderDetails";
import { getOrders } from "@/firebase/http/Orders";
import { IOrders } from "@/types/Orders";
import { openModal } from "@/utils/handleModal";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Agenda() {
  const [selectedOrder, setSelectedOrder] = useState<IOrders>();

  const { data: ordersData } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    onError: () => {
      toast.error("Erro ao buscar peças. Tente novamente");
    },
  });

  const handleSelectEvent = (id: string) => {
    const currentOrder = ordersData?.find((order) => order.id === id);

    setSelectedOrder(currentOrder);

    openModal("orderDetailsModal");
  };
  return (
    <Layout>
      {selectedOrder && (
        <OrderDetailsModal defaultValues={selectedOrder as IOrders} />
      )}
      {ordersData && (
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
      )}
    </Layout>
  );
}

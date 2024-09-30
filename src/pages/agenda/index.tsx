import Calendar from "@/components/FullCalendar";
import { Layout } from "@/components/Layout";
import OrderModal from "@/components/OrderDetails/orderDetails";
import { getOrders } from "@/firebase/http/Orders";
import { IOrders } from "@/types/Orders";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Agenda() {
  const [selectedOrder, setSelectedOrder] = useState<IOrders>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen((state) => !state);
  };
  const { data: ordersData } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    onError: () => {
      toast.error("Erro ao buscar peças. Tente novamente");
    },
    refetchOnWindowFocus: false,
  });

  const handleSelectEvent = (id: string) => {
    const currentOrder = ordersData?.find((order) => order.id === id);

    setSelectedOrder(currentOrder);

    handleCloseModal();
  };
  return (
    <Layout>
      {selectedOrder && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          order={selectedOrder}
        />
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

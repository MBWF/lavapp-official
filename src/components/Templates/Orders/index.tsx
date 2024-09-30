import OrderModal from "@/components/OrderDetails/orderDetails";
import { Button } from "@/components/ui/button";
import { deleteOrder } from "@/firebase/http/Orders";
import { IOrders } from "@/types/Orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { OrdersTable } from "./Table";

export type OrdersPageProps = {
  ordersData: IOrders[];
  isLoading: boolean;
};

export function OrdersTemplate({ ordersData, isLoading }: OrdersPageProps) {
  const queryClient = useQueryClient();
  const [currentItem, setCurrentItem] = useState<IOrders | null>(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen((state) => !state);
  };
  const { mutateAsync } = useMutation((id: string) => deleteOrder(id), {
    onSuccess: () => {
      toast.success("Pedido excluido com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: Error) => {
      toast.error("Erro ao excluir Pedido. Tente novamente.");
      console.error(error);
    },
  });

  const handleDeleteOrder = async (id: string) => {
    await mutateAsync(id);
  };

  return (
    <section className="shadow-lg p-8">
      {currentItem && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          order={currentItem}
        />
      )}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl">Pedidos</h1>
        <Button onClick={() => router.push("/pedidos/criar")}>
          Novo Pedido
        </Button>
      </div>
      {isLoading ? (
        <div className="w-full flex justify-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <OrdersTable
          ordersData={ordersData}
          setCurrentItem={setCurrentItem}
          handleDelete={handleDeleteOrder}
          handleCloseModal={handleCloseModal}
        />
      )}
    </section>
  );
}

import { deleteOrder } from "@/firebase/http/Orders";
import { IOrders } from "@/types/Orders";
import { Button, Heading } from "@/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { OrderDetailsModal } from "../../OrderDetails";
import { OrdersTable } from "./Table";

export type OrdersPageProps = {
  ordersData: IOrders[];
  isLoading: boolean;
};

export function OrdersTemplate({ ordersData, isLoading }: OrdersPageProps) {
  const queryClient = useQueryClient();
  const [currentItem, setCurrentItem] = useState<IOrders>({} as IOrders);
  const router = useRouter();

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
      {currentItem && <OrderDetailsModal defaultValues={currentItem} />}
      <div className="flex justify-between items-center mb-8">
        <Heading>Pedidos</Heading>
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
        />
      )}
    </section>
  );
}

import { deleteOrder } from "@/firebase/http/Orders";
import { IOrders } from "@/types/Orders";
import { Button, Heading } from "@/ui";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { OrderDetailsModal } from "../../OrderDetails";
import { OrdersTable } from "./Table";

export type OrdersPageProps = {
  ordersData: IOrders[];
};

export function OrdersTemplate({ ordersData }: OrdersPageProps) {
  const [currentItem, setCurrentItem] = useState<IOrders>({} as IOrders);
  const router = useRouter();

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteOrder(id);
      toast.success("Pedido excluido com sucesso.");
    } catch (error) {
      toast.error("Erro ao excluir Pedido. Tente novamente.");
      console.error(error);
    }
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
      <OrdersTable
        ordersData={ordersData}
        setCurrentItem={setCurrentItem}
        handleDelete={handleDeleteItem}
      />
    </section>
  );
}

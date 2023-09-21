import { Button, Heading } from "@/ui";
import { useRouter } from "next/router";
import { OrdersTable } from "./Table";

export function OrdersTemplate() {
  const router = useRouter();

  return (
    <section className="shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <Heading>Pedidos</Heading>
        <Button onClick={() => router.push("/pedidos/criar")}>
          Novo Pedido
        </Button>
      </div>
      <OrdersTable
        ordersData={[
          {
            name: "Marcio",
            isDelivery: true,
            items_number: 8,
            status: "FINISHED",
          },
        ]}
        handleDelete={() => {}}
      />
    </section>
  );
}

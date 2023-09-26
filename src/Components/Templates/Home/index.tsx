import { OrderDetailsModal } from "@/components/OrderDetails";
import { OrderCard } from "@/components/OrderTable";
import { IOrders } from "@/types/Orders";
import { Heading, Text } from "@/ui";
import { useState } from "react";

export function HomePage({ todayOrders }: { todayOrders: IOrders[] }) {
  const [selectedOrder, setSelectedOrder] = useState<IOrders>({} as IOrders);
  return (
    <section className="shadow-lg p-8">
      {selectedOrder && <OrderDetailsModal defaultValues={selectedOrder} />}
      <Heading>Home</Heading>

      <div className="flex flex-col justify-between">
        <aside className="flex flex-col my-8 w-full">
          <Text className="text-2xl text-center w-fit my-4">
            Informações da Semana
          </Text>

          <div>
            <div className="stats stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Qntd. Pedidos</div>
                <div className="stat-value">18</div>
              </div>

              <div className="stat">
                <div className="stat-title">Novos Clientes</div>
                <div className="stat-value">4</div>
              </div>

              <div className="stat">
                <div className="stat-title">Peças Lavadas</div>
                <div className="stat-value">2500</div>
              </div>
            </div>
          </div>
        </aside>
        <aside className="flex flex-col items-start my-8">
          <Text className="text-2xl text-center w-fit my-4">
            Pedidos de Hoje
          </Text>

          <div>
            <OrderCard
              setSelectedOrder={setSelectedOrder}
              orders={todayOrders}
            />
          </div>
        </aside>
      </div>
    </section>
  );
}

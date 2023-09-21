import { OrderCard } from "@/components/OrderTable";
import { Heading, Text } from "@/ui";

export function HomePage() {
  return (
    <section className="shadow-lg p-8">
      <Heading>Home</Heading>

      <div className="flex items-center justify-between">
        <aside className="flex flex-col items-start my-8">
          <Text className="text-2xl text-center w-fit my-4">
            Pedidos de Hoje
          </Text>

          <div>
            <OrderCard
              orders={[
                {
                  name: "Márcio",
                  hour: "16:00",
                  item_code: "m2",
                  isDelivery: true,
                  status: "FINISHED",
                },
                {
                  name: "Pastor",
                  hour: "12:00",
                  item_code: "ptor",
                  isDelivery: false,
                  status: "NOT FINISHED",
                },
                {
                  name: "Jairo",
                  hour: "10:00",
                  item_code: "jr",
                  isDelivery: false,
                  status: "FINISHED",
                },
                {
                  name: "Norma",
                  hour: "17:00",
                  item_code: "2",
                  isDelivery: true,
                  status: "FINISHED",
                },
              ]}
            />
          </div>
        </aside>
        <aside className="flex flex-col my-8 w-full">
          <Text className="text-2xl text-center w-fit my-4">
            Informações da Semana
          </Text>

          <div>
            <div className="stats stats-vertical shadow">
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
      </div>
    </section>
  );
}

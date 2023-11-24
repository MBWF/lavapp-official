import { IOrders } from "@/types/Orders";
import { Heading, Text } from "@/ui";
import { useState } from "react";

import { OrderDetailsModal } from "@/components/OrderDetails";
import { OrderCard } from "@/components/OrderTable";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Peças lavadas",
      data: labels.map(() => Math.random() * 50),
      backgroundColor: "rgba(0, 162, 255, 0.5)",
    },
  ],
};

export const Piedata = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Total de Peças",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 0, 55, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "red",
        "blue",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export function HomePage({ todayOrders }: { todayOrders: IOrders[] }) {
  const [selectedOrder, setSelectedOrder] = useState<IOrders>({} as IOrders);
  return (
    <section className="shadow-lg p-8">
      {selectedOrder && <OrderDetailsModal defaultValues={selectedOrder} />}
      <Heading>Home</Heading>

      <div className="h-80 w-full">
        <Bar options={options} data={data} />
      </div>
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

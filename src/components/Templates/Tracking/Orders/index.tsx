import { OrderStatusHandler } from "@/components";
import { IOrders } from "@/types/Orders";
import { Heading, Text } from "@/ui";
import { convertDateToShow } from "@/utils/convertDate";

export function CustomerOrder({ order }: { order: IOrders }) {
  return (
    <div className="bg-white rounded-lg shadow flex flex-col justify-center mb-4 p-4">
      <Heading className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Pedido:
      </Heading>
      <div className="flex flex-col gap-2">
        <Text className="text-lg">{order.customer?.name ?? order.name}</Text>
        <Text className="text-lg">
          Coleta: <strong>{convertDateToShow(order.collect_date)}</strong>
        </Text>
        <Text className="text-lg">
          Entrega Prevista: <b>{convertDateToShow(order.delivery_date)}</b>
        </Text>
      </div>
      <div className="my-2">
        <OrderStatusHandler currentStep={order.status?.id} />
      </div>
    </div>
  );
}

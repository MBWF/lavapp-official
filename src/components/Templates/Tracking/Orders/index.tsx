import OrderStatusStepper from "@/components/OrderDetails/orderStatus";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IOrders } from "@/types/Orders";
import { convertDateToShow } from "@/utils/convertDate";

export function CustomerOrder({ order }: { order: IOrders }) {
  return (
    <Card className="bg-white rounded-lg shadow flex flex-col justify-center mb-4 p-4">
      <CardHeader>
        <CardTitle>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Pedido:
          </h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <span className="text-lg">{order.customer?.name ?? order.name}</span>
          <span className="text-lg">
            Coleta: <strong>{convertDateToShow(order.collect_date)}</strong>
          </span>
          <span className="text-lg">
            Entrega Prevista: <b>{convertDateToShow(order.delivery_date)}</b>
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <OrderStatusStepper initialStatus={order.status?.name} />
      </CardFooter>
    </Card>
  );
}

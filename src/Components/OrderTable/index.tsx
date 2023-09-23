import { Text } from "@/ui";
import translateOrder from "@/utils/translateOrder";
import { CheckCircle, ConciergeBell, Truck, XCircle } from "lucide-react";

type OrderCardProps = {
  orders: {
    name: string;
    hour: string;
    item_code: string;
    status: string;
    isDelivery?: boolean;
  }[];
};

export function OrderCard({ orders }: OrderCardProps) {
  return (
    <table className="text-left w-full border-collapse">
      <thead className="bg-primary">
        <tr>
          <th className="py-4 px-6 font-bold uppercase text-sm text-white border-b border-grey-light">
            Cliente
          </th>
          <th className="py-4 px-6 font-bold uppercase text-sm text-white border-b border-grey-light">
            Horário
          </th>
          <th className="py-4 px-6 font-bold uppercase text-sm text-white border-b border-grey-light">
            Modalidade
          </th>
          <th className="py-4 px-6 font-bold text-center uppercase text-sm text-white border-b border-grey-light">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr className="hover:bg-grey-lighter" key={order.name}>
            <td className="py-4 px-6 border-b  border-grey-light">
              <Text className="mr-16 w-32 text-lg overflow-hidden truncate">
                {order.name}
              </Text>
            </td>
            <td className="py-4 px-6 w-40 text-center border-b border-grey-light">
              <Text className="mr-16 w-32">{order.hour}hrs</Text>
            </td>
            <td className="py-4 px-6 text-center border-b border-grey-light">
              {order.isDelivery ? (
                <Text className="flex items-center text-lg gap-2 text-blue-900 ">
                  Delivery <ConciergeBell className="mt-1" />
                </Text>
              ) : (
                <Text className="flex items-center gap-2 text-lg text-green-400 ">
                  Entrega <Truck className="mt-1" />
                </Text>
              )}
            </td>
            <td className="py-4 px-16 text-center border-b border-grey-light">
              <Text className="text-lg text-center flex items-center">
                <div
                  className="tooltip"
                  data-tip={translateOrder(order.status)}
                >
                  {order.status === "FINISHED" ? (
                    <CheckCircle color="green" />
                  ) : (
                    <XCircle color="red" />
                  )}
                </div>
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
import { Text } from "@/ui";
import { ConciergeBell, Truck } from "lucide-react";

export default function OrderIsDelivery({
  isDelivery,
}: {
  isDelivery: boolean;
}) {
  return (
    <Text className="text-md text-center flex items-center">
      {isDelivery ? (
        <Text className="flex items-center text-md gap-2 text-blue-900 ">
          Retirada <ConciergeBell className="mt-1" />
        </Text>
      ) : (
        <Text className="flex items-center gap-2 text-lg text-green-400 ">
          Entrega <Truck className="mt-1" />
        </Text>
      )}
    </Text>
  );
}

import { IOrderStatus } from "@/types/Orders";
import { Text } from "@/ui";
import translateOrder from "@/utils/translateOrder";
import { CheckCircle, Droplets, Sparkle, Truck, User } from "lucide-react";

const orderStatusObject: IOrderStatus = {
  SCREENING: { icon: <User className="text-primary" />, label: "Triagem" },
  WASHING: { icon: <Droplets className="text-primary" />, label: "Lavando" },
  IRONING: { icon: <Sparkle className="text-primary" />, label: "Passando" },
  FINISHED: { icon: <CheckCircle className="text-primary" />, label: "Pronto" },
  DELIVERED: { icon: <Truck className="text-primary" />, label: "Entregue" },
};

export default function OrderStatus({ status }: { status: string }) {
  return (
    <div
      className="tooltip"
      data-tip={translateOrder(orderStatusObject["SCREENING"].label)}
    >
      <div className="flex flex-col justify-center">
        <Text className="text-base">
          {orderStatusObject["SCREENING"].icon}{" "}
          {orderStatusObject["SCREENING"].label}
        </Text>
      </div>
    </div>
  );
}

import { Text } from "@/ui";
import translateOrder from "@/utils/translateOrder";
import { CheckCircle, XCircle } from "lucide-react";

export default function OrderStatus({ status }: { status: string }) {
  return (
    <Text className="text-lg text-center flex items-center">
      <Text className="text-lg text-center flex items-center">
        <div className="tooltip" data-tip={translateOrder(status)}>
          {status === "FINISHED" ? (
            <CheckCircle color="green" />
          ) : (
            <XCircle color="red" />
          )}
        </div>
      </Text>
    </Text>
  );
}

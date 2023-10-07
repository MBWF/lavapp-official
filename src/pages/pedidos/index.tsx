import { Layout } from "@/components";
import { OrdersTemplate } from "@/components/Templates/Orders";
import { getOrders } from "@/firebase/http/Orders";
import { IOrders } from "@/types/Orders";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function OrdersPage() {
  const {
    data: ordersData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    onError: () => {
      toast.error("Erro ao buscar peças. Tente novamente");
    },
    refetchOnWindowFocus: false,
  });
  return (
    <Layout>
      {ordersData && (
        <OrdersTemplate
          ordersData={ordersData as IOrders[]}
          isLoading={isLoading || isFetching}
        />
      )}
    </Layout>
  );
}


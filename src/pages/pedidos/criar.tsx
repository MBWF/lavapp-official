import { Layout } from "@/components/Layout";
import { CreateNewOrderTemplate } from "@/components/Templates/Orders/Create";
import { getCustomers } from "@/firebase/http/customers";
import { getItems } from "@/firebase/http/items";
import { ICustomers } from "@/types/Customers";
import { IItems } from "@/types/Items";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function CreateOrder() {
  const { data: customersData, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
    onError: () => {
      toast.error(
        "Erro ao buscar clientes. Atualize a página e tente novamente"
      );
    },
    refetchOnWindowFocus: false,
  });

  const { data: itemsData, isLoading: isLoadingItems } = useQuery({
    queryKey: ["items"],
    queryFn: () => getItems(),
    onError: () => {
      toast.error("Erro ao buscar peças. Tente novamente");
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Layout>
      {customersData && itemsData && (
        <CreateNewOrderTemplate
          customerData={customersData as ICustomers[]}
          itemsData={itemsData as IItems[]}
          isLoading={isLoadingCustomers || isLoadingItems}
        />
      )}
    </Layout>
  );
}

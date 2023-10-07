import { Layout } from "@/components";
import { ItemsPage } from "@/components/Templates/Items";
import { getItems } from "@/firebase/http/items";
import { IItems } from "@/types/Items";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Pecas() {
  const {
    data: itemsData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["items"],
    queryFn: () => getItems(),
    onError: () => {
      toast.error("Erro ao buscar peças. Tente novamente");
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Layout>
      {itemsData && (
        <ItemsPage
          itemsData={itemsData as IItems[]}
          isLoading={isLoading || isFetching}
        />
      )}
    </Layout>
  );
}


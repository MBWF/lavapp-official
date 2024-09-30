import { Layout } from "@/components/Layout";
import { ItemsPage } from "@/components/Templates/Items";
import { getItems } from "@/firebase/http/items";
import { IItems } from "@/types/Items";
import { useQuery } from "@tanstack/react-query";

export default function Pecas() {
  const { data: itemsData, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: () => getItems(),
    refetchOnWindowFocus: false,
  });

  return (
    <Layout>
      {itemsData && (
        <ItemsPage itemsData={itemsData as IItems[]} isLoading={isLoading} />
      )}
    </Layout>
  );
}

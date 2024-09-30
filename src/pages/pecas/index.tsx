import { Layout } from "@/components";
import { ItemsPage } from "@/components/Templates/Items";
import { getItems } from "@/firebase/http/items";
import { IItems } from "@/types/Items";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["items"], () => getItems());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};



import { Layout } from "@/components";
import { CustomerPage } from "@/components/Templates/Customer";
import { getCustomers } from "@/firebase/http/customers";
import { ICustomers } from "@/types/Customers";
import { useQuery } from "@tanstack/react-query";

import { GetServerSideProps } from "next";
import { toast } from "react-toastify";

export default function Customer() {
  const {
    data: customersData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
    onError: () => {
      toast.error(
        "Erro ao buscar clientes. Atualize a página e tente novamente"
      );
    },
  });

  return (
    <Layout>
      {customersData && (
        <CustomerPage
          customersData={customersData as ICustomers[]}
          isLoading={isLoading || isFetching}
        />
      )}
    </Layout>
  );
}



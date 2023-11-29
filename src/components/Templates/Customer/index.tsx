import { ICustomers } from "@/types/Customers";
import { Button, Heading } from "@/ui";
import { useRouter } from "next/router";
import { CustomerTable } from "./Table";
import { deleteCustomer } from "@/firebase/http/customers";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CustomerPageProps = {
  customersData: ICustomers[];
  isLoading: boolean;
};

export function CustomerPage({ customersData, isLoading }: CustomerPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();


  const { mutateAsync } = useMutation((id: string) => deleteCustomer(id), {
    onSuccess: () => {
      toast.success("Cliente deletado com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: Error) => {
      toast.error("Erro ao deletar cliente. Tente novamente.");
      console.error(error);
    },
  });

  const handleDeleteCustomer = async (id: string) => {
    await mutateAsync(id);
  };

  return (
    <section className="shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <Heading>Clientes</Heading>
        <Button onClick={() => router.push("/clientes/criar")}>
          Novo Cliente
        </Button>
      </div>
      {isLoading ? (
        <div className="w-full flex justify-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <CustomerTable
          customersData={customersData}
          handleDelete={handleDeleteCustomer}
        />
      )}
    </section>
  );
}

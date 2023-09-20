import { ICustomers } from "@/types/Customers";
import { Button, Heading } from "@/ui";
import { useRouter } from "next/router";
import { CustomerTable } from "./Table";
import { deleteCustomer } from "@/firebase/http/customers";
import { toast } from "react-toastify";

export function CustomerPage({
  customersData,
}: {
  customersData: ICustomers[];
}) {
  const router = useRouter();

  const handleDeleteCustomer = async (id: string) => {
    try {
      await deleteCustomer(id);
      toast.success("Cliente deletado com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar cliente. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <section className="shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <Heading>Clientes</Heading>
        <Button onClick={() => router.push("/clientes/criar")}>
          Novo Cliente
        </Button>
      </div>
      <CustomerTable
        customersData={customersData}
        handleDelete={handleDeleteCustomer}
      />
    </section>
  );
}

import { ICustomers } from "@/types/Customers";
import { Button, Heading } from "@/ui";
import { useRouter } from "next/router";
import { CustomerTable } from "./Table";

export function CustomerPage({
  customersData,
}: {
  customersData: ICustomers[];
}) {
  const router = useRouter();

  return (
    <section className="shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <Heading>Clientes</Heading>
        <Button onClick={() => router.push("/clientes/criar")}>
          Novo Cliente
        </Button>
      </div>
      <CustomerTable customersData={customersData} />
    </section>
  );
}

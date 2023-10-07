import { Layout } from "@/components";
import CreateCustomer from "@/components/Templates/Customer/Create";
import { CustomerSchemaType } from "@/components/Templates/Customer/Create/validations";
import { createCustomer } from "@/firebase/http/customers";
import { ICustomers } from "@/types/Customers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

export default function NewCustomer() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: CustomerSchemaType) =>
      createCustomer({
        name: data.name,
        cpf: data.cpf,
        phone_number: data.phone_number,
        code: data.item_code,
        email: data.email,
        birthdate: data.birthdate,
        gender: data.gender.value,
        address: {
          district: data.district,
          number: data.place_number,
          street: data.street,
          state: data.state,
          zip_code: data.cep,
          city: data.city,
          complement: data.complement,
        },
      } as ICustomers),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
      toast.success("Cliente cadastrado com sucesso.");
      router.push("/clientes");
    },
    onError: (error: Error) => {
      toast.error("Erro ao cadastrado cliente.");
      console.error(error);
    },
  });

  const handleCreateCustomer: SubmitHandler<CustomerSchemaType> = (data) => {
    mutateAsync(data);
  };
  return (
    <Layout>
      <CreateCustomer handleSubmitForm={handleCreateCustomer} />
    </Layout>
  );
}

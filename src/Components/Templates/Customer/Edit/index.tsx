import { editCustomer } from "@/firebase/http/customers";
import { ICustomers } from "@/types/Customers";
import { Button, Heading, Input, InputMaskCustom } from "@/ui";
import CustomDatePicker from "@/ui/Form/DatePicker";
import { DefaultSelectInput } from "@/ui/Form/Select/DefaultSelect";
import { ErrorMessage } from "@/ui/Typography/ErrorMessage";
import { convertDateToInput } from "@/utils/convertDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CustomerSchemaType, customerSchema } from "./validations";

const genderList = [
  { value: "MALE", label: "Masculino" },
  { value: "FEMALE", label: "Feminino" },
  { value: "OTHER", label: "Outros" },
];

type EditCustomerPageProps = {
  customerData: ICustomers;
};

export default function EditCustomer({ customerData }: EditCustomerPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CustomerSchemaType>({
    defaultValues: {
      name: customerData.name,
      cpf: customerData.cpf,
      email: customerData.email,
      phone_number: customerData.phone_number,
      birthdate: convertDateToInput(String(customerData.birthdate)),
      item_code: customerData.code,
      district: customerData.address.district,
      gender: genderList.find((gender) => gender.value === customerData.gender),
      place_number: customerData.address.number,
      street: customerData.address.street,
      city: customerData.address.city,
      state: customerData.address.state,
      cep: customerData.address.zip_code,
      complement: customerData.address.complement,
    },
    resolver: zodResolver(customerSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: CustomerSchemaType) =>
      editCustomer(
        {
          name: data.name,
          cpf: data.cpf,
          phone_number: data.phone_number,
          code: data.item_code,
          birthdate: data.birthdate,
          gender: data.gender.value,
          address: {
            city: data.city,
            state: data.state,
            district: data.district,
            number: data.place_number,
            street: data.street,
            zip_code: data.cep,
            complement: data.complement,
          },
        } as ICustomers,
        String(router.query.id)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
      toast.success("Cliente editado com sucesso.");
      router.push("/clientes");
    },
    onError: (error: Error) => {
      toast.error("Erro ao editar cliente. Tente mais tarde.");
      console.error(error);
    },
  });

  const handleEditCustomer: SubmitHandler<CustomerSchemaType> = (data) => {
    mutateAsync(data);
  };

  return (
    <form
      className="shadow-lg p-8 flex flex-col w-full"
      onSubmit={handleSubmit(handleEditCustomer)}
    >
      <Heading className="w-full">Editar Cliente</Heading>
      <section className="flex gap-8">
        <div className="flex flex-col gap-3 w-60 mb-12">
          <Input
            label="Nome Completo"
            hasError={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Email"
            hasError={errors.email?.message}
            {...register("email")}
          />
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <InputMaskCustom
                  type="text"
                  label="CPF"
                  placeholder="Insira o número de cpf"
                  onChange={onChange}
                  value={value}
                  hasError={!!error?.message}
                  mask="999.999.999-99"
                  maskChar=""
                />
                {!!error?.message && (
                  <ErrorMessage>{error?.message}</ErrorMessage>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="phone_number"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <InputMaskCustom
                  type="tel"
                  label="Celular"
                  placeholder="Insira o número do telefone"
                  onChange={onChange}
                  value={value}
                  hasError={!!error?.message}
                  mask="99 99999-9999"
                  maskChar=""
                />
                {!!error?.message && (
                  <ErrorMessage>{error?.message}</ErrorMessage>
                )}
              </>
            )}
          />

          <div>
            <Controller
              name="birthdate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker
                  label="Data de Nascimento"
                  type="date"
                  onChange={onChange}
                  value={String(value)}
                  hasError={errors.birthdate?.message}
                />
              )}
            />
          </div>
          <div className="w-full">
            <Controller
              name="gender"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DefaultSelectInput
                  defaultOptions={genderList}
                  label="Gênero"
                  placeholder="Selecione o gênero"
                  hasError={error?.message}
                  {...field}
                />
              )}
            />
          </div>

          <Input
            label="Código"
            hasError={errors.name?.message}
            {...register("item_code")}
          />
        </div>
        <div className="flex flex-col gap-1 w-60 mb-12">
          <Input
            label="CEP"
            hasError={errors.cep?.message}
            {...register("cep")}
          />
          <Input
            label="Cidade"
            hasError={errors.city?.message}
            {...register("city")}
          />
          <Input
            label="Estado"
            hasError={errors.state?.message}
            {...register("state")}
          />
          <Input
            label="Rua"
            hasError={errors.street?.message}
            {...register("street")}
          />
          <Input
            label="Bairro"
            hasError={errors.district?.message}
            {...register("district")}
          />
          <Input
            label="Número"
            hasError={errors.place_number?.message}
            {...register("place_number")}
          />
          <Input
            label="Complemento"
            hasError={errors.complement?.message}
            {...register("complement")}
          />
        </div>
      </section>

      <div className="flex w-full gap-4">
        <Button
          variant="cancel"
          type="button"
          onClick={() => router.push("/clientes")}
        >
          Cancelar
        </Button>
        <Button type="submit">Cadastrar</Button>
      </div>
    </form>
  );
}

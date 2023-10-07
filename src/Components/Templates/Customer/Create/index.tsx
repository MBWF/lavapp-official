import { Button, Heading, Input, InputMaskCustom } from "@/ui";
import CustomDatePicker from "@/ui/Form/DatePicker";
import { DefaultSelectInput } from "@/ui/Form/Select/DefaultSelect";
import { ErrorMessage } from "@/ui/Typography/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CustomerSchemaType, customerSchema } from "./validations";
import { createCustomer } from "@/firebase/http/customers";
import { ICustomers } from "@/types/Customers";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const genderList = [
  { value: "MALE", label: "Masculino" },
  { value: "FEMALE", label: "Feminino" },
  { value: "OTHER", label: "Outros" },
];

export default function CreateCustomer() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CustomerSchemaType>({
    resolver: zodResolver(customerSchema),
  });

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
    <form
      className="shadow-lg p-8 flex flex-col w-full"
      onSubmit={handleSubmit(handleCreateCustomer)}
    >
      <Heading className="w-full">Novo Cliente</Heading>
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
            hasError={errors.item_code?.message}
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

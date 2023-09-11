import { Button, Heading, Input } from "@/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { customerSchema, CustomerSchemaType } from "./validations";
import { DefaultSelectInput } from "@/ui/Form/Select/DefaultSelect";

export default function CreateCustomer() {
  const router = useRouter();

  const { register, control } = useForm<CustomerSchemaType>({
    resolver: zodResolver(customerSchema),
  });

  return (
    <form className="shadow-lg p-8 flex flex-col">
      <Heading className="w-full">Novo Cliente</Heading>
      <section className="flex gap-8 my-4">
        <div>
          <Input label="Nome Completo" {...register("name")} />

          {/* <Controller
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
                  mask="(99) 99999-9999"
                  maskChar=""
                />
                {!!error?.message && <ErrorMessage message={error?.message} />}
              </>
            )}
          />

          <Input label="CPF" {...register("cpf")} />

          <Controller
            name="birthdate"
            control={control}
            render={() => (
              <CustomDatePicker
                label="Data de Nascimento"
                placeholderText="Insira a data de nascimento"
                format="dd/MM/yyyy"
                selected={dateDisplay}
                onChange={(date) => {
                  setDateDisplay(date);
                }}
                customInput={<InputMaskCustom mask="99/99/9999" />}
                hasError={errors.birthdate?.message}
              />
            )}
          /> */}

          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <DefaultSelectInput
                  {...field}
                  defaultOptions={[]}
                  label="Gênero"
                  placeholder="Selecione o gênero"
                  hasError={error?.message}
                />
              </>
            )}
          />
        </div>
        <div>
          <Input label="CEP" />
          <Input label="Rua" />
          <Input label="Bairro" />
          <Input label="Número" />
          <Input label="Complemento" />
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
        <Button>Cadastrar</Button>
      </div>
    </form>
  );
}

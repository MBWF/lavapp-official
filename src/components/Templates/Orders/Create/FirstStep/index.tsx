import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICustomers } from "@/types/Customers";
import { DefaultSelectInput, InputMaskCustom } from "@/ui";
import { Controller, useFormContext } from "react-hook-form";
import { OrderSchemaType } from "../validations";

export type FirstStepProps = {
  customerData: ICustomers[];
};

export function FirstStep({ customerData }: FirstStepProps) {
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<OrderSchemaType>();

  const isNewCustomer = watch("isNewCustomer");
  return (
    <div className="text-lg">
      <Controller
        name="customer"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DefaultSelectInput
            defaultOptions={customerData.map((customer) => {
              return {
                label: customer.name,
                value: customer.id,
              };
            })}
            label="Selecione o cliente"
            placeholder="Escolha aqui"
            isDisabled={isNewCustomer}
            hasError={error?.message}
            {...field}
          />
        )}
      />

      <div className="flex gap-2 items-center my-4">
        <Checkbox
          id="isNewCustomer"
          onCheckedChange={(value) => setValue("isNewCustomer", !!value)}
        />
        <Label
          htmlFor="isNewCustomer"
          className="text-md font-medium cursor-pointer"
        >
          Cliente avulso
        </Label>
      </div>
      {isNewCustomer && (
        <div className="w-full flex flex-col gap-4">
          <Input
            id="name"
            label="Nome Completo"
            errorMessage={errors.name?.message}
            placeholder="Insira o nome aqui"
            {...register("name")}
          />
          <Controller
            control={control}
            name="phone_number"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <InputMaskCustom
                  type="tel"
                  label="Celular"
                  placeholder="Insira o número do what's app"
                  onChange={onChange}
                  value={value}
                  mask="(99) 99999-9999"
                  maskChar=""
                />
                {!!error?.message && (
                  <span className="text-destructive text-sm">
                    {error?.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}

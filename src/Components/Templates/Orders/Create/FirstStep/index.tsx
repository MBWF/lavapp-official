import {
  DefaultSelectInput,
  ErrorMessage,
  Input,
  InputMaskCustom,
  Text,
} from "@/ui";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { OrderSchemaType } from "../validations";
import { useState } from "react";
import { ICustomers } from "@/types/Customers";

export type FirstStepProps = {
  control: Control<OrderSchemaType>;
  register: UseFormRegister<OrderSchemaType>;
  errors: FieldErrors<OrderSchemaType>;
  customerData: ICustomers[];
};

export function FirstStep({
  control,
  register,
  errors,
  customerData,
}: FirstStepProps) {
  const [isNewCustomer, setIsNewCustomer] = useState<boolean>(false);
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

      <div className="form-control w-44 my-2">
        <label className="label cursor-pointer">
          <Text className="label-text text-lg">Cliente Avulso</Text>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={isNewCustomer}
            {...register("isNewCustomer", {
              onChange: () => {
                setIsNewCustomer((state) => !state);
              },
            })}
          />
        </label>
      </div>
      {isNewCustomer && (
        <div className="w-full flex flex-col gap-4">
          <Input
            label="Nome Completo"
            hasError={errors.name?.message}
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
                  mask="99 99999-9999"
                  maskChar=""
                />
                {!!error?.message && (
                  <ErrorMessage>{error?.message}</ErrorMessage>
                )}
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}

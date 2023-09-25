import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { OrderSchemaType } from "../validations";
import CustomDatePicker from "@/ui/Form/DatePicker";
import { convertDateToInput } from "@/utils/convertDate";
import { Input, Text } from "@/ui";
import { useState } from "react";

export type ThirdStepProps = {
  control: Control<OrderSchemaType>;
  register: UseFormRegister<OrderSchemaType>;
  errors: FieldErrors<OrderSchemaType>;
};

export function ThirdStep({ control, errors, register }: ThirdStepProps) {
  const [isDelivery, setIsDelivery] = useState<boolean>(false);
  return (
    <section>
      <div className="flex flex-col gap-4 ml-6">
        <div>
          <Controller
            name="collect_date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomDatePicker
                label="Dia da Coleta"
                type="date"
                onChange={onChange}
                value={String(value)}
                hasError={errors.collect_date?.message}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="delivery_date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomDatePicker
                label="Data de Entrega"
                type="date"
                onChange={onChange}
                value={String(value)}
                hasError={errors.delivery_date?.message}
              />
            )}
          />
        </div>

        <div className="form-control w-fit">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-primary mr-2"
              checked={isDelivery}
              {...register("isDelivery", {
                onChange: () => {
                  setIsDelivery((state) => !state);
                },
              })}
            />
            <Text className="label-text text-lg">Para Entrega</Text>
          </label>
        </div>

        {isDelivery && (
          <div className="flex flex-wrap gap-8">
            <div className="w-1/4">
              <Input
                label="CEP"
                hasError={errors.cep?.message}
                {...register("cep")}
              />
            </div>
            <div className="w-1/4">
              <Input
                label="Rua"
                hasError={errors.street?.message}
                {...register("street")}
              />
            </div>
            <div className="w-1/4">
              <Input
                label="Bairro"
                hasError={errors.district?.message}
                {...register("district")}
              />
            </div>
            <div className="w-1/4">
              <Input
                label="Número"
                hasError={errors.place_number?.message}
                {...register("place_number")}
              />
            </div>
            <div className="w-1/4">
              <Input
                label="Complemento"
                hasError={errors.complement?.message}
                {...register("complement")}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

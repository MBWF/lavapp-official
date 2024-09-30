import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import CustomDatePicker from "@/ui/Form/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import { OrderSchemaType } from "../validations";
import { Input } from "@/components/ui/input";

export function ThirdStep() {
  const {
    control,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useFormContext<OrderSchemaType>();

  const isDelivery = watch("isDelivery");

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
                type="datetime-local"
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
                type="datetime-local"
                onChange={onChange}
                value={String(value)}
                hasError={errors.delivery_date?.message}
              />
            )}
          />
        </div>

        <div className="flex gap-2 items-center">
          <Checkbox
            id="isDelivery"
            onCheckedChange={(value) => setValue("isDelivery", !!value)}
          />
          <Label htmlFor="isDelivery" className="text-md cursor-pointer">
            Para Entrega
          </Label>
        </div>

        {isDelivery && (
          <div className="flex flex-wrap gap-8">
            <div className="w-1/4">
              <Input
                id="cep"
                label="CEP"
                errorMessage={errors.cep?.message}
                {...register("cep")}
              />
            </div>
            <div className="w-1/4">
              <Input
                id="street"
                label="Rua"
                errorMessage={errors.street?.message}
                {...register("street")}
              />
            </div>
            <div className="w-1/4">
              <Input
                id="district"
                label="Bairro"
                errorMessage={errors.district?.message}
                {...register("district")}
              />
            </div>
            <div className="w-1/4">
              <Input
                id="place_number"
                label="Número"
                errorMessage={errors.place_number?.message}
                {...register("place_number")}
              />
            </div>
            <div className="w-1/4">
              <Input
                id="complement"
                label="Complemento"
                errorMessage={errors.complement?.message}
                {...register("complement")}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

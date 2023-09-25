import { Button, Heading } from "@/ui";
import { FirstStep } from "./FirstStep";
import { SubmitHandler, useForm } from "react-hook-form";
import { OrderSchemaType, orderSchema } from "./validations";
import { useCreateOrder } from "@/contexts/Order/useCreateOrder";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { SecondStep } from "./SecondStep";
import { ICustomers } from "@/types/Customers";
import { IItems } from "@/pages/pecas";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ThirdStep } from "./ThirdStep";
import { convertDateToInput } from "@/utils/convertDate";
import { REQUIRED_ERROR } from "@/utils/ErrorsMessages";
import { ConfirmationStep } from "./Confirmation";

type OrdersPageProps = {
  customerData: ICustomers[];
  itemsData: IItems[];
};

export type SelectedItemsProps = {
  id: string;
  name: string;
  quantity: number;
};

export function CreateNewOrderTemplate({
  customerData,
  itemsData,
}: OrdersPageProps) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<OrderSchemaType>({
    defaultValues: {
      collect_date: convertDateToInput(new Date().toISOString()),
    },
    resolver: zodResolver(orderSchema),
  });
  const router = useRouter();
  const { currentStep, handleNextStep, handlePreviousStep } = useCreateOrder();
  const [selectedItems, setSelectedItems] = useState<SelectedItemsProps[]>([]);

  const handleSubmitOrder: SubmitHandler<OrderSchemaType> = (data) => {
    for (let prop in errors) {
      if (errors.hasOwnProperty(prop)) return;
    }

    if (currentStep === 2) {
      if (selectedItems.length === 0) {
        toast.warning("Você deve adicionar as peças para avançar.");
        return;
      }
    }

    if (currentStep === 3) {
      if (!data.collect_date) {
        setError("collect_date", { message: REQUIRED_ERROR });
        return;
      }
      if (!data.delivery_date) {
        setError("delivery_date", { message: REQUIRED_ERROR });
        return;
      }
    }

    if (currentStep === 4) {
      console.log(data);
      return;
    }

    handleNextStep();
  };

  return (
    <div className="shadow-lg p-8 flex flex-col w-full">
      <Heading>Novo pedido</Heading>

      <form
        className="m-auto w-2/3 flex flex-col"
        onSubmit={handleSubmit(handleSubmitOrder)}
      >
        <ul className="steps text-xl my-12">
          <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>
            Cliente
          </li>
          <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>
            Peças
          </li>
          <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>
            Entrega
          </li>
          <li className={`step ${currentStep >= 4 ? "step-primary" : ""}`}>
            Confirmação
          </li>
        </ul>
        <div className="m-auto w-full px-12">
          {currentStep === 1 && (
            <FirstStep
              control={control}
              register={register}
              errors={errors}
              customerData={customerData}
            />
          )}
          {currentStep === 2 && (
            <SecondStep
              itemsData={itemsData}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          )}
          {currentStep === 3 && (
            <ThirdStep control={control} register={register} errors={errors} />
          )}
          {currentStep === 4 && (
            <ConfirmationStep
              selectedItems={selectedItems}
              orderData={getValues()}
            />
          )}
          <div className="flex justify-between my-16">
            <Button variant="cancel" onClick={() => router.push("/pedidos")}>
              Cancelar
            </Button>
            <div className="flex gap-4">
              <Button
                variant="outlined"
                disabled={currentStep === 1}
                onClick={handlePreviousStep}
              >
                Voltar
              </Button>

              <Button type="submit">
                {currentStep === 4 ? "Cadastrar" : "Próximo"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

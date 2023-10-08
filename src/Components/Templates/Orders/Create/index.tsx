import { useCreateOrder } from "@/contexts/Order/useCreateOrder";
import { createOrder } from "@/firebase/http/Orders";

import { ICustomers } from "@/types/Customers";
import { Button, Heading } from "@/ui";
import { REQUIRED_ERROR } from "@/utils/ErrorsMessages";
import { convertDateToInput } from "@/utils/convertDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ConfirmationStep } from "./Confirmation";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";
import { OrderSchemaType, orderSchema } from "./validations";
import { IItems } from "@/types/Items";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type OrdersPageProps = {
  customerData: ICustomers[];
  itemsData: IItems[];
  isLoading: boolean;
};

export type SelectedItemsProps = {
  id: string;
  name: string;
  quantity: number;
};

export function CreateNewOrderTemplate({
  customerData,
  itemsData,
  isLoading,
}: OrdersPageProps) {
  const queryClient = useQueryClient();

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
  const { currentStep, handleNextStep, handlePreviousStep, lastOrderNumber } =
    useCreateOrder();
  const [selectedItems, setSelectedItems] = useState<SelectedItemsProps[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { mutate } = useMutation(
    (data: OrderSchemaType) =>
      createOrder(
        {
          customer: !data.isNewCustomer
            ? {
                id: String(data.customer?.value),
                name: String(data.customer?.label),
              }
            : null,
          phone_number: data.isNewCustomer ? String(data.phone_number) : null,
          name: data.isNewCustomer ? String(data.name) : null,
          address: !data.isDelivery
            ? null
            : {
                zip_code: String(data.cep),
                district: String(data.district),
                place_number: String(data.place_number),
                street: String(data.street),
                complement: data.complement,
              },
          order_number: 2,
          total: totalPrice,
          collect_date: String(data.collect_date),
          delivery_date: String(data.delivery_date),
          items: selectedItems,
          isDelivery: Boolean(data.isDelivery),
          isNewCustomer: Boolean(data.isNewCustomer),
          description: data.description ?? "",
          status: {
            id: 1,
            name: "SORTING",
          },
        },
        lastOrderNumber
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"]);
        toast.success("Pedido criado com sucesso.");
        router.push("/pedidos");
      },
      onError: (error: Error) => {
        toast.error("Erro ao criar novo pedido. Tente novamente.");
        console.error(error);
      },
    }
  );

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
      mutate(data);
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
          {currentStep === 1 && !isLoading && (
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
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
          )}
          {currentStep === 3 && (
            <ThirdStep control={control} register={register} errors={errors} />
          )}
          {currentStep === 4 && (
            <ConfirmationStep
              selectedItems={selectedItems}
              orderData={getValues()}
              totalPrice={totalPrice}
              register={register}
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

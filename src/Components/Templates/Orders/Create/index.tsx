import { useCreateOrder } from "@/contexts/Order/useCreateOrder";
import { createOrder } from "@/firebase/http/Orders";

import { ICustomers } from "@/types/Customers";
import { IItems } from "@/types/Items";
import { Button } from "@/components/ui/button";
import { REQUIRED_ERROR } from "@/utils/ErrorsMessages";
import { convertDateToInput } from "@/utils/convertDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ConfirmationStep } from "./Confirmation";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";
import { OrderSchemaType, orderSchema } from "./validations";
import OrderCreationStepper from "./stepper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DeleteAlert } from "@/components/ui/components/alerts/delele";

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
  const router = useRouter();

  const methods = useForm<OrderSchemaType>({
    defaultValues: {
      collect_date: convertDateToInput(new Date().toISOString()),
    },
    resolver: zodResolver(orderSchema),
  });

  const {
    currentStep,
    handleNextStep,
    handlePreviousStep,
    lastOrderNumber,
    handleResetSteps,
  } = useCreateOrder();
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
          phone_number: data.isNewCustomer
            ? String(data.phone_number)
            : String(
                customerData.find((e) => data.customer?.value === e.id)
                  ?.phone_number
              ),
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
        methods.reset();
        handleResetSteps();
        router.push("/pedidos");
      },
      onError: (error: Error) => {
        toast.error("Erro ao criar novo pedido. Tente novamente.");
        console.error(error);
      },
    }
  );

  const handleSubmitOrder: SubmitHandler<OrderSchemaType> = (data) => {
    for (let prop in methods.formState.errors) {
      if (methods.formState.errors.hasOwnProperty(prop)) return;
    }

    if (currentStep === 2) {
      if (selectedItems.length === 0) {
        toast.warning("Você deve adicionar as peças para avançar.");
        return;
      }
    }

    if (currentStep === 3) {
      if (!data.collect_date) {
        methods.setError("collect_date", { message: REQUIRED_ERROR });
        return;
      }
      if (!data.delivery_date) {
        methods.setError("delivery_date", { message: REQUIRED_ERROR });
        return;
      }
    }

    if (currentStep === 4) {
      mutate(data);
      return;
    }

    handleNextStep();
  };

  console.log(methods.formState.errors);

  return (
    <div className="shadow-lg p-8 flex flex-col w-full">
      <h1 className="text-2xl">Novo pedido</h1>
      <FormProvider {...methods}>
        <form
          className="m-auto w-2/3 flex flex-col"
          onSubmit={methods.handleSubmit(handleSubmitOrder)}
        >
          <OrderCreationStepper currentStep={currentStep} />
          <div className="m-auto w-full px-12">
            {currentStep === 1 && !isLoading && (
              <FirstStep customerData={customerData} />
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
            {currentStep === 3 && <ThirdStep />}
            {currentStep === 4 && (
              <ConfirmationStep
                selectedItems={selectedItems}
                totalPrice={totalPrice}
              />
            )}
            <div className="flex justify-between my-16">
              <DeleteAlert
                title="Deseja cancelar a operação?"
                description="Se você cancelar, todas as informações serão perdidas."
                onConfirm={() => router.push("/pedidos")}
                confirmButtonLabel="Cancelar"
                trigger={
                  <Button
                    variant="destructive"
                    className="flex items-center"
                    type="button"
                  >
                    Cancelar
                  </Button>
                }
              />
              <div className="flex justify-between gap-4">
                <Button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="flex items-center"
                  type="button"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
                <Button
                  onClick={handleNextStep}
                  variant="default"
                  className="flex items-center"
                >
                  Próximo
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

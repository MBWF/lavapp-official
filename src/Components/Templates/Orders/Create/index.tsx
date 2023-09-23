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

type OrdersPageProps = {
  customerData: ICustomers[];
  itemsData: IItems[];
};

export function CreateNewOrderTemplate({
  customerData,
  itemsData,
}: OrdersPageProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderSchemaType>({ resolver: zodResolver(orderSchema) });
  const router = useRouter();
  const { currentStep, handleNextStep, handlePreviousStep } = useCreateOrder();

  console.log(errors);
  const handleSubmitOrder: SubmitHandler<OrderSchemaType> = (data) => {
    for (let prop in errors) {
      if (errors.hasOwnProperty(prop)) return;
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
            Endereço
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
          {currentStep === 2 && <SecondStep itemsData={itemsData} />}
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

              <Button type="submit">Próximo</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

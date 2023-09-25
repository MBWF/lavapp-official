import { Text } from "@/ui";
import { SelectedItemsProps } from "..";
import { OrderSchemaType } from "../validations";
import { convertDateToShow } from "@/utils/convertDate";

type ConfirmationStepProps = {
  selectedItems: SelectedItemsProps[];
  orderData: OrderSchemaType;
};

export function ConfirmationStep({
  selectedItems,
  orderData,
}: ConfirmationStepProps) {
  return (
    <section className="flex flex-col gap-8">
      <div>
        <Text className="text-xl">
          <b>Dados do Cliente</b>
        </Text>

        <div className="mt-2">
          <div className="flex w-64 justify-between">
            <Text>Nome:</Text>
            <Text>
              {orderData.isNewCustomer
                ? orderData.name
                : orderData.customer?.label}
            </Text>
          </div>

          {orderData.isNewCustomer && (
            <div className="flex w-60 justify-between">
              <Text>Telefone:</Text>
              <Text>
                {orderData.isNewCustomer
                  ? orderData.phone_number
                  : orderData.customer?.label}
              </Text>
            </div>
          )}
        </div>
      </div>

      <div>
        <Text className="text-xl">
          <b>Dados do Pedido</b>
        </Text>

        <div className="flex justify-between">
          <div>
            {selectedItems.map((item) => (
              <div key={item.id} className="flex justify-between w-80 my-2">
                <Text>{item.name}</Text>
                <Text>{item.quantity}x</Text>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Text className="mr-2">
                Data de <b>Coleta</b>
              </Text>
              <Text>{convertDateToShow(String(orderData.collect_date))}</Text>
            </div>
            <div className="flex flex-col">
              <Text className="mr-2">
                Data de <b>Entrega</b>:
              </Text>
              <Text>{convertDateToShow(String(orderData.delivery_date))}</Text>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Text className="text-xl">
          <b>Detalhes da Entrega</b>
        </Text>

        {orderData.isDelivery ? (
          <div className="flex justify-between">
            <div className="flex flex-col mt-2">
              <Text>CEP:</Text>
              <Text className="text-lg">{orderData.cep}</Text>
            </div>

            <div className="flex flex-col mt-2">
              <Text>Bairro:</Text>
              <Text className="text-lg">{orderData.district}</Text>
            </div>
            <div className="flex flex-col mt-2">
              <Text>Rua:</Text>
              <Text className="text-lg">{orderData.street}</Text>
            </div>
            <div className="flex flex-col mt-2">
              <Text>Número: </Text>
              <Text className="text-lg">{orderData.place_number}</Text>
            </div>
          </div>
        ) : (
          <Text>Para retirar na lavanderia</Text>
        )}
      </div>
    </section>
  );
}

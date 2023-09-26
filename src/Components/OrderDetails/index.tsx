import { Modal } from "@/components/Modal";
import { Text } from "@/ui";

import { IOrders } from "@/types/Orders";
import { convertDateToShow } from "@/utils/convertDate";
import { formatCurrency } from "@/utils/formatCurrency";
import { closeModal } from "@/utils/handleModal";

export function OrderDetailsModal({
  defaultValues,
}: {
  defaultValues: IOrders;
}) {
  const onCloseModal = () => {
    closeModal("orderDetailsModal");
  };

  return (
    <Modal
      id="orderDetailsModal"
      title="Dados do pedido"
      onCloseModal={onCloseModal}
    >
      <section>
        <div className="mt-4">
          <Text className="text-xl">
            <b>Cliente</b>
          </Text>

          <div className="mt-2">
            <div className="flex">
              <div className="w-24">
                <Text className="text-lg">Nome:</Text>
              </div>
              <Text>
                {defaultValues.isNewCustomer
                  ? defaultValues.name
                  : defaultValues.customer?.name}
              </Text>
            </div>

            {defaultValues.isNewCustomer && (
              <div className="flex">
                <div className="w-24">
                  <Text className="text-lg">Telefone:</Text>
                </div>
                <Text>
                  {defaultValues.isNewCustomer
                    ? defaultValues.phone_number
                    : defaultValues.customer?.name}
                </Text>
              </div>
            )}
          </div>
        </div>

        <div className="divider" />
        <div className="my-4">
          <Text className="text-xl">
            <b>Pedido</b>
          </Text>

          <div className="flex justify-between">
            <div className="flex flex-wrap gap-8 ">
              <div className="flex flex-col w-40">
                <Text className="text-lg">
                  Data de <b>Coleta</b>
                </Text>
                <Text>
                  {convertDateToShow(
                    defaultValues.collect_date ?? new Date().toISOString()
                  )}
                </Text>
              </div>
              <div className="flex flex-col">
                <Text className="text-lg">
                  Data de <b>Entrega</b>:
                </Text>
                <Text>
                  {convertDateToShow(
                    defaultValues.delivery_date ?? new Date().toISOString()
                  )}
                </Text>
              </div>

              <div className="flex flex-col w-40">
                <Text className="mr-2">Total de peças</Text>
                <Text>
                  <b>
                    {defaultValues.items?.reduce(
                      (acc, elem) => (acc += Number(elem.quantity)),
                      0
                    )}
                  </b>
                </Text>
              </div>
              <div className="flex flex-col">
                <Text className="mr-2">Valor Total</Text>
                <Text>
                  <b>{formatCurrency(defaultValues.total)}</b>
                </Text>
              </div>
            </div>
          </div>
        </div>

        <div className="divider" />
        <div>
          <Text className="text-xl">
            <b>Peças</b>
          </Text>
          {defaultValues.items?.map((item) => (
            <div key={item.id} className="flex justify-between w-80 my-2">
              <Text>{item.name}</Text>
              <Text>{item.quantity}x</Text>
            </div>
          ))}

          <div className="flex flex-col my-4">
            <Text className="text-lg">Observação:</Text>
            <Text className="text-md">{defaultValues.description}</Text>
          </div>
        </div>

        <div className="divider" />

        <div className="flex flex-col">
          <Text className="text-xl">
            <b>Detalhes da Entrega</b>
          </Text>

          {defaultValues.isDelivery ? (
            <div className="flex flex-col justify-between flex-wrap gap-2">
              <div className="flex mt-2 gap-4">
                <div className="flex gap-2">
                  <Text className="text-lg">
                    <b>CEP:</b>
                  </Text>
                  <Text className="text-lg">
                    {defaultValues.address?.zip_code}
                  </Text>
                </div>

                <div className="flex gap-2">
                  <Text className="text-lg">
                    <b>Bairro:</b>
                  </Text>
                  <Text className="text-lg">
                    {defaultValues.address?.district}
                  </Text>
                </div>
              </div>

              <div className="flex flex-col mt-2">
                <Text className="text-lg">
                  <b>Rua:</b>
                </Text>
                <Text className="text-lg">{defaultValues.address?.street}</Text>
              </div>
              <div className="flex gap-2 mt-2">
                <Text className="text-lg">
                  <b>Número: </b>
                </Text>
                <Text className="text-lg">
                  {defaultValues.address?.place_number}
                </Text>
              </div>
            </div>
          ) : (
            <Text>Para retirar na lavanderia</Text>
          )}
        </div>
      </section>
    </Modal>
  );
}

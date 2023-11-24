import { getOrdersByPhoneNumber } from "@/firebase/http/Orders";
import { Button, ErrorMessage, Heading, InputMaskCustom, Text } from "@/ui";
import { REQUIRED_ERROR } from "@/utils/ErrorsMessages";
import { useMutation } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { CustomerOrder } from "./Orders";

const trackingSchema = z.object({
  phone_number: z
    .string({
      required_error: REQUIRED_ERROR,
    })
    .min(2, REQUIRED_ERROR),
});

export type TrackingSchemaType = z.infer<typeof trackingSchema>;

export function TrackingPage() {
  const { handleSubmit, control } = useForm<TrackingSchemaType>();

  const { mutate, data } = useMutation(
    (data: { phone_number: string }) =>
      getOrdersByPhoneNumber(data.phone_number),

    {
      onError: (error) => {
        console.error(error);
        toast.error("Erro ao consultar o pedido. Tente novamente mais tarde");
      },
    }
  );

  const handleLogin: SubmitHandler<TrackingSchemaType> = async (data) => {
    mutate(data);
  };
  return (
    <section className="bg-gray-50 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <Text className="flex items-center mb-6 text-2xl text-gray-900">
          LavApp
        </Text>
        <div className="overflow-y-auto">
          {!data ? (
            <div className="w-80 bg-white rounded-lg shadow md:mt-0 md:w-96 xl:p-0 flex items-center justify-center">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
                <Heading className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Consulte seu pedido.
                </Heading>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <div>
                    <Controller
                      control={control}
                      name="phone_number"
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <InputMaskCustom
                            type="tel"
                            label="Celular"
                            placeholder="Insira o número do telefone"
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
                  <div className="w-full flex justify-center">
                    <Button className="w-1/2" type="submit">
                      Consultar
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            data.map((order) => (
              <div key={order.id} className="flex flex-col">
                <CustomerOrder order={order} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

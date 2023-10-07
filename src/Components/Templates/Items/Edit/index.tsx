import { Modal } from "@/components/Modal";
import { Button, CurrencyInput, DefaultSelectInput, Input } from "@/ui";
import { closeModal } from "@/utils/handleModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { editItem } from "@/firebase/http/items";
import { IItems, UNIT_LiST } from "@/types/Items";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ItemsValidation, itemsSchema } from "./validations";

type LabelAndValue = {
  label: string;
  value: string;
};

export function EditItemModal({
  defaultValues,
}: {
  defaultValues: IItems | null;
}) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<ItemsValidation>({
    defaultValues: {
      ...defaultValues,
      price: String(defaultValues?.price),
      un: defaultValues?.un === "pair" ? UNIT_LiST[1] : UNIT_LiST[0] ?? {},
    },
    resolver: zodResolver(itemsSchema),
  });

  const onCloseModal = () => {
    closeModal("editItemModal");
  };

  useEffect(() => {
    setValue("name", String(defaultValues?.name));
    setValue("price", String(defaultValues?.price));
    setValue(
      "un",
      defaultValues?.un === "pair" ? UNIT_LiST[1] : UNIT_LiST[0] ?? {}
    );
  }, [defaultValues, setValue]);

  const { mutateAsync } = useMutation(
    (data: ItemsValidation) =>
      editItem(
        { ...data, price: Number(data.price), un: data.un.value },
        String(defaultValues?.id)
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["items"]);
        onCloseModal();
        toast.success("Peça editada com sucesso.");
      },
      onError: (error: Error) => {
        toast.error("Erro ao editar peça. Tente novamente.");
        console.error(error);
      },
    }
  );

  const submitNewItem: SubmitHandler<ItemsValidation> = async (data) => {
    await mutateAsync(data);
  };

  return (
    <Modal id="editItemModal" title="Editar Peça" onCloseModal={onCloseModal}>
      <form
        onSubmit={handleSubmit(submitNewItem)}
        className="flex flex-col gap-4"
      >
        {defaultValues?.price && (
          <>
            <div className="flex gap-4 mb-4">
              <Input
                label="Nome"
                placeholder="Insira o nome da peça"
                hasError={errors.name?.message}
                defaultValue={defaultValues.name}
                {...register("name")}
              />
              <CurrencyInput
                control={control}
                label="Preço"
                name="price"
                placeholder="Insira o preço da peça"
                defaultValue={String(defaultValues.price)}
                error={errors.price}
              />
            </div>
            <div className="w-full">
              <Controller
                name="un"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DefaultSelectInput
                    defaultOptions={UNIT_LiST}
                    label="Unidade"
                    placeholder="Selecione a unidade da peça"
                    hasError={error?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </>
        )}

        <div className="flex gap-4 justify-end mt-4">
          <Button variant="outlined" type="button" onClick={onCloseModal}>
            Cancelar
          </Button>
          <Button type="submit">Editar</Button>
        </div>
      </form>
    </Modal>
  );
}

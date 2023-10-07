import { Modal } from "@/components/Modal";
import { Button, CurrencyInput, Input } from "@/ui";
import { closeModal } from "@/utils/handleModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { editItem } from "@/firebase/http/items";
import { IItems } from "@/types/Items";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ItemsValidation, itemsSchema } from "./validations";

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
    },
    resolver: zodResolver(itemsSchema),
  });

  const onCloseModal = () => {
    closeModal("editItemModal");
  };

  useEffect(() => {
    setValue("name", String(defaultValues?.name));
    setValue("un", String(defaultValues?.un));
    setValue("price", String(defaultValues?.price));
  }, [defaultValues, setValue]);

  const { mutateAsync } = useMutation(
    (data: ItemsValidation) =>
      editItem(
        { ...data, price: Number(data.price) },
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
      <form onSubmit={handleSubmit(submitNewItem)}>
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
            <div className="w-1/2">
              <Input
                label="Unidade"
                placeholder="Insira o tipo de unidade da peça"
                hasError={errors.un?.message}
                defaultValue={defaultValues?.un}
                {...register("un")}
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

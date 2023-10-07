import { Modal } from "@/components/Modal";
import { createItem } from "@/firebase/http/items";
import { Button, CurrencyInput, DefaultSelectInput, Input } from "@/ui";
import { closeModal } from "@/utils/handleModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ItemsValidation, itemsSchema } from "./validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UNIT_LiST } from "@/types/Items";

export function CreateItemModal() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ItemsValidation>({
    resolver: zodResolver(itemsSchema),
  });

  const onCloseModal = () => {
    reset();
    setValue("price", 0);
    closeModal("createItemModal");
  };

  const { mutateAsync } = useMutation({
    mutationFn: (data: ItemsValidation) =>
      createItem({ ...data, un: data.un.value }),
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
      onCloseModal();
      toast.success("Peça criada com sucesso.");
    },
    onError: (error: Error) => {
      toast.error("Erro ao criar peça. Tente novamente.");
      console.error(error);
    },
  });

  const submitNewItem: SubmitHandler<ItemsValidation> = (data) => {
    mutateAsync(data);
  };

  return (
    <Modal
      id="createItemModal"
      data-testid="createItemModal"
      title="Nova Peça"
      onCloseModal={onCloseModal}
    >
      <form
        onSubmit={handleSubmit(submitNewItem)}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-4 mb-4">
          <Input
            label="Nome"
            placeholder="Insira o nome da peça"
            hasError={errors.name?.message}
            {...register("name")}
          />
          <CurrencyInput
            control={control}
            label="Preço"
            name="price"
            placeholder="Insira o preço da peça"
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

        <div className="flex gap-4 justify-end mt-4">
          <Button variant="outlined" type="button" onClick={onCloseModal}>
            Cancelar
          </Button>
          <Button type="submit">Adicionar</Button>
        </div>
      </form>
    </Modal>
  );
}

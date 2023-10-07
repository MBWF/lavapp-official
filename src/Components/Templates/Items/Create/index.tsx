import { Modal } from "@/components/Modal";
import { createItem } from "@/firebase/http/items";
import { Button, CurrencyInput, Input } from "@/ui";
import { closeModal } from "@/utils/handleModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ItemsValidation, itemsSchema } from "./validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    mutationFn: (data: ItemsValidation) => createItem(data),
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
    <Modal id="createItemModal" title="Nova Peça" onCloseModal={onCloseModal}>
      <form onSubmit={handleSubmit(submitNewItem)}>
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
        <div className="w-1/2">
          <Input
            label="Unidade"
            placeholder="Insira o tipo de unidade da peça"
            hasError={errors.un?.message}
            {...register("un")}
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

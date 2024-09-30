import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { editItem } from "@/firebase/http/items";
import { IItems, UNIT_LiST } from "@/types/Items";
import { CurrencyInput, DefaultSelectInput } from "@/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ItemsValidation, itemsSchema } from "./validations";
import { Edit2, Trash2 } from "lucide-react";

type EditItemModalProps = {
  defaultValues: IItems | null;
};

export function EditItemModal({ defaultValues }: EditItemModalProps) {
  const [openModal, setOpenModal] = useState(false);
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

  useEffect(() => {
    setValue("name", String(defaultValues?.name));
    setValue("price", String(defaultValues?.price));
    setValue(
      "un",
      defaultValues?.un === "pair" ? UNIT_LiST[1] : UNIT_LiST[0] ?? {}
    );
  }, [defaultValues, setValue]);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const { mutate, isLoading } = useMutation(
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

  const submitNewItem: SubmitHandler<ItemsValidation> = (data) => {
    mutate(data);
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={() => setOpenModal((state) => !state)}
    >
      <DialogTrigger>
        <Button variant="outline">
          <Edit2 size={16} className="text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">Nova peça</DialogTitle>
          <form
            onSubmit={handleSubmit(submitNewItem)}
            className="flex flex-col gap-4"
          >
            <div className="flex gap-4 mb-4">
              <Input
                id="name"
                label="Nome"
                placeholder="Insira o nome da peça"
                errorMessage={errors.name?.message}
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
              <Button variant="outline" type="button" onClick={onCloseModal}>
                Cancelar
              </Button>

              <Button type="submit" disabled={isLoading}>
                Editar
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

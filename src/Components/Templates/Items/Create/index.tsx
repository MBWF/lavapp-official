import { Modal } from "@/components/Modal";
import { Button, Input } from "@/ui";
import { SubmitHandler, useForm } from "react-hook-form";

type IFields = {
  name: string;
  price: number;
  un: string;
};

export function CreateItemModal() {
  const { register, handleSubmit } = useForm<IFields>();

  const submitNewItem: SubmitHandler<IFields> = async (data) => {
    console.log(data);
  };
  return (
    <Modal id="createItemModal" title="Nova Peça">
      <form onSubmit={handleSubmit(submitNewItem)}>
        <div className="flex gap-4">
          <Input
            label="Nome"
            placeholder="Insira o nome da peça"
            {...register("name")}
          />
          <Input
            label="Preço"
            placeholder="Insira o preço da peça"
            {...register("price")}
          />
        </div>
        <div className="w-1/2">
          <Input
            label="Unidade"
            placeholder="Insira o tipo de unidade da peça"
            {...register("un")}
          />
        </div>

        <div className="flex gap-4 justify-end mt-4">
          <Button variant="outlined">Cancelar</Button>
          <Button>Adicionar</Button>
        </div>
      </form>
    </Modal>
  );
}

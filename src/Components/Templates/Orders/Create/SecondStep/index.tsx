import { IItems } from "@/pages/pecas";
import { Button, DefaultSelectInput, Input } from "@/ui";
import { useState } from "react";

export type SecondStepProps = {
  itemsData: IItems[];
};

export function SecondStep({ itemsData }: SecondStepProps) {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <div className="text-lg">
      <div className="flex justify-between w-full items-end">
        <DefaultSelectInput
          defaultOptions={itemsData.map((item) => {
            return {
              label: item.name,
              value: item.id,
            };
          })}
          label="Selecione a peça"
          placeholder="Escolha o item para adicionar"
        />

        <div>
          <Input label="Quantidade" type="number" />
        </div>
        <Button className="btn-accent">Adicionar</Button>
      </div>
    </div>
  );
}

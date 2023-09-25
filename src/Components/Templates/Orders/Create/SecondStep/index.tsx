import { IItems } from "@/pages/pecas";
import { Button, DefaultSelectInput, Input, Text } from "@/ui";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { SelectedItemsProps } from "..";

export type SecondStepProps = {
  itemsData: IItems[];
  selectedItems: SelectedItemsProps[];
  setSelectedItems: Dispatch<SetStateAction<SelectedItemsProps[]>>;
};

type CurrentSelectedItemProps = {
  value: string;
  label: string;
};

export function SecondStep({
  itemsData,
  selectedItems,
  setSelectedItems,
}: SecondStepProps) {
  const [currentSelectedItem, setCurrentSelectedItem] =
    useState<CurrentSelectedItemProps>();
  const [currentQuantity, setCurrentQuantity] = useState<number>(1);

  const handleResetFields = () => {
    setCurrentSelectedItem({
      label: "",
      value: "",
    });
    setCurrentQuantity(0);
  };

  const handleAddItem = () => {
    setSelectedItems((state: any) => {
      return [
        ...state,
        {
          id: currentSelectedItem?.value,
          name: currentSelectedItem?.label,
          quantity: currentQuantity,
        },
      ];
    });
    handleResetFields();
  };

  const handleLessItem = (itemId: string) => {
    const changedValue = selectedItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity === 0) return item;
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }

      return item;
    });

    setSelectedItems(changedValue);
  };

  const handleMoreItem = (itemId: string) => {
    const changedValue = selectedItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setSelectedItems(changedValue);
  };

  const handleDeleteItem = (itemId: string) => {
    const changedValue = selectedItems.filter((item) => item.id !== itemId);

    setSelectedItems(changedValue);
  };

  return (
    <div className="text-lg">
      <div className="flex justify-between w-full items-end mb-8">
        <DefaultSelectInput
          defaultOptions={itemsData.map((item) => {
            return {
              label: item.name,
              value: item.id,
            };
          })}
          onChange={setCurrentSelectedItem}
          label="Selecione a peça"
          placeholder="Adicione o item"
        />

        <div>
          <Input
            label="Quantidade"
            type="number"
            value={currentQuantity}
            onChange={(e) => setCurrentQuantity(Number(e.target.value))}
          />
        </div>
        <Button
          className="btn-accent"
          disabled={!currentSelectedItem || currentQuantity === 0}
          onClick={() => handleAddItem()}
        >
          Adicionar
        </Button>
      </div>
      <Text>
        <Text className="mr-4">Total de peças:</Text>
        <b>
          {selectedItems.reduce(
            (acc, elem) => (acc += Number(elem.quantity)),
            0
          )}
        </b>
      </Text>
      {selectedItems.map((item: SelectedItemsProps) => (
        <div key={item.id} className="flex flex-col w-full">
          <div className="my-2 w-full flex justify-between items-center">
            <Text className="flex">{item.name}</Text>
            <div className="flex gap-8">
              <div className="flex items-center gap-8 shadow-md">
                <Button
                  variant="iconButton"
                  onClick={() => handleLessItem(item.id)}
                >
                  <Minus />
                </Button>
                <Text>{item.quantity}</Text>
                <Button
                  variant="iconButton"
                  onClick={() => handleMoreItem(item.id)}
                >
                  <Plus />
                </Button>
              </div>
              <Button
                variant="iconButton"
                className="bg-red-500 mr-4"
                onClick={() => handleDeleteItem(item.id)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
          <div className="divider m-0" />
        </div>
      ))}
    </div>
  );
}

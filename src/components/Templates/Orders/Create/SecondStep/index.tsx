import { IItems } from "@/types/Items";
import { DefaultSelectInput } from "@/ui";
import { formatCurrency } from "@/utils/formatCurrency";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { SelectedItemsProps } from "..";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";

export type SecondStepProps = {
  itemsData: IItems[];
  selectedItems: SelectedItemsProps[];
  setSelectedItems: Dispatch<SetStateAction<SelectedItemsProps[]>>;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
};

type CurrentSelectedItemProps = {
  value: string;
  label: string;
};

export function SecondStep({
  itemsData,
  selectedItems,
  setSelectedItems,
  totalPrice,
  setTotalPrice,
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

  const handleGetItemsPrice = useCallback(() => {
    let value = 0;
    selectedItems.forEach((item) => {
      itemsData.map((currentItem) => {
        if (currentItem.id === item.id) {
          value += currentItem.price * item.quantity;
        }
      });
    });

    setTotalPrice(value);
  }, [itemsData, selectedItems, setTotalPrice]);

  useEffect(() => {
    handleGetItemsPrice();
  }, [handleGetItemsPrice, selectedItems]);

  return (
    <div className="text-lg">
      <div className="flex justify-between w-full items-end mb-8">
        <DefaultSelectInput
          defaultOptions={itemsData
            .filter(
              (item1) => !selectedItems.some((item2) => item2.id === item1.id)
            )
            .map((item) => {
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
            id="quantity"
            label="Quantidade"
            type="number"
            min={0}
            value={currentQuantity}
            onChange={(e) => setCurrentQuantity(Number(e.target.value))}
          />
        </div>
        <Button
          disabled={!currentSelectedItem || currentQuantity === 0}
          onClick={() => handleAddItem()}
        >
          Adicionar
        </Button>
      </div>
      <div className="flex justify-between">
        <p>
          <p className="mr-4">Total de peças:</p>
          <b>
            {selectedItems.reduce(
              (acc, elem) => (acc += Number(elem.quantity)),
              0
            )}
          </b>
        </p>
        <p>
          <p className="mr-4">Valor total:</p>
          <b>{formatCurrency(totalPrice)}</b>
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Excluir</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedItems.map((item: SelectedItemsProps) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-8 shadow-md w-fit">
                  <Button
                    variant="outline"
                    onClick={() => handleLessItem(item.id)}
                  >
                    <Minus />
                  </Button>
                  <p>{item.quantity}</p>
                  <Button
                    variant="outline"
                    onClick={() => handleMoreItem(item.id)}
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 size={16} className="text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

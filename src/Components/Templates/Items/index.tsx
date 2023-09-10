import { IItems } from "@/pages/pecas";
import { Button, Heading } from "@/ui";

import { openModal } from "@/utils/handleModal";
import { CreateItemModal } from "./Create";

import { useState } from "react";
import { ItemsTable } from "./Table";
import { EditItemModal } from "./Edit";
import { deleteItem } from "@/firebase/http/items";
import { toast } from "react-toastify";

export function ItemsPage({ itemsData }: { itemsData: IItems[] }) {
  const [currentItem, setCurrentItem] = useState<IItems | null>({} as IItems);

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Peça deletada com sucesso.");
    } catch (error) {
      toast.success("Erro ao deletar peça. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <section className="shadow-lg p-8">
      <CreateItemModal />
      {currentItem && <EditItemModal defaultValues={currentItem} />}
      <div className="flex justify-between items-center">
        <Heading>Peças</Heading>
        <Button
          onClick={() => {
            setCurrentItem(null);
            openModal("createItemModal");
          }}
        >
          Nova Peça
        </Button>
      </div>
      <ItemsTable
        itemsData={itemsData}
        handleDelete={handleDeleteItem}
        setCurrentItem={setCurrentItem}
      />
    </section>
  );
}

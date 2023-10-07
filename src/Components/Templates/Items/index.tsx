import { Button, Heading } from "@/ui";

import { openModal } from "@/utils/handleModal";
import { CreateItemModal } from "./Create";

import { deleteItem } from "@/firebase/http/items";
import { IItems } from "@/types/Items";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { EditItemModal } from "./Edit";
import { ItemsTable } from "./Table";

type ItemsPageProps = {
  itemsData: IItems[];
  isLoading: boolean;
};

export function ItemsPage({ itemsData, isLoading }: ItemsPageProps) {
  const queryClient = useQueryClient();
  const [currentItem, setCurrentItem] = useState<IItems | null>({} as IItems);

  const { mutateAsync } = useMutation((id: string) => deleteItem(id), {
    onSuccess: () => {
      toast.success("Peça deletada com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: () => {
      toast.error("Erro ao excluir peça. Tente Novamente");
    },
  });

  const handleDeleteItem = async (id: string) => {
    await mutateAsync(id);
  };

  return (
    <section className="shadow-lg p-8">
      <CreateItemModal />
      {currentItem && <EditItemModal defaultValues={currentItem} />}
      <div className="flex justify-between items-center mb-8">
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
      {isLoading ? (
        <div className="w-full flex justify-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <ItemsTable
          itemsData={itemsData}
          handleDelete={handleDeleteItem}
          setCurrentItem={setCurrentItem}
        />
      )}
    </section>
  );
}

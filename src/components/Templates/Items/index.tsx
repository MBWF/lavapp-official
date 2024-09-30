import { Heading } from "@/ui";

import { deleteItem } from "@/firebase/http/items";
import { IItems } from "@/types/Items";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CreateItemModal } from "./Create";
import { ItemsTable } from "./Table";

type ItemsPageProps = {
  itemsData: IItems[];
  isLoading: boolean;
};

export function ItemsPage({ itemsData, isLoading }: ItemsPageProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((id: string) => deleteItem(id), {
    onSuccess: () => {
      toast.success("Peça deletada com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: () => {
      toast.error("Erro ao excluir peça. Tente Novamente");
    },
  });

  const handleDeleteItem = (id: string) => {
    mutate(id);
  };

  return (
    <section className="shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <Heading>Peças</Heading>
        <CreateItemModal />
      </div>
      {isLoading ? (
        <div className="w-full flex justify-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <ItemsTable itemsData={itemsData} handleDelete={handleDeleteItem} />
      )}
    </section>
  );
}

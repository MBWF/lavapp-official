import { IItems } from "@/pages/pecas";
import { Button } from "@/ui";
import { Table } from "@/ui/Table";
import { formatCurrency } from "@/utils/formatCurrency";
import { openModal } from "@/utils/handleModal";
import { createColumnHelper } from "@tanstack/react-table";

import { Edit2, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const columnHelper = createColumnHelper<any>();

type ItemsTableProps = {
  itemsData: IItems[];
  setCurrentItem: Dispatch<SetStateAction<IItems>>;
  handleDelete: (id: string) => Promise<void>;
};

export function ItemsTable({
  itemsData,
  setCurrentItem,
  handleDelete,
}: ItemsTableProps) {
  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "Código",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Nome",
    }),
    columnHelper.accessor("un", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Unidade",
    }),
    columnHelper.accessor("price", {
      cell: (info) => <span>{formatCurrency(Number(info.getValue()))}</span>,
      header: "Preço",
    }),
    columnHelper.accessor("", {
      cell: (info) => (
        <div className="flex gap-4">
          <Button
            variant="iconButton"
            onClick={() => {
              setCurrentItem(info.row.original);
              openModal("editItemModal");
            }}
          >
            <Edit2 className="text-blue-500" size={16} />
          </Button>
          <Button
            variant="iconButton"
            onClick={() => handleDelete(info.row.original.id)}
          >
            <Trash2 color="red" size={16} />
          </Button>
        </div>
      ),
      header: "Ações",
    }),
  ];
  return <Table tableData={itemsData} columns={columns} />;
}

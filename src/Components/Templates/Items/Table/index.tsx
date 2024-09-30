import { IItems } from "@/types/Items";
import { Table } from "@/ui/Table";
import { formatCurrency } from "@/utils/formatCurrency";
import { createColumnHelper } from "@tanstack/react-table";

import { DeleteAlert } from "@/components/ui/components/alerts/delele";
import { EditItemModal } from "../Edit/indexEdit";

const columnHelper = createColumnHelper<any>();

type ItemsTableProps = {
  itemsData: IItems[];
  handleDelete: (id: string) => void;
};

export function ItemsTable({ itemsData, handleDelete }: ItemsTableProps) {
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
      cell: (info) => (
        <span>{info.getValue() === "pair" ? "Par" : "Unidade"}</span>
      ),
      header: "Unidade",
    }),
    columnHelper.accessor("price", {
      cell: (info) => <span>{formatCurrency(Number(info.getValue()))}</span>,
      header: "Preço",
    }),
    columnHelper.accessor("", {
      cell: (info) => (
        <div className="flex gap-4">
          <EditItemModal defaultValues={info.row.original} />
          <DeleteAlert
            title="Excluir Peça"
            description="Você deseja realmente excluir essa peça? Essa ação é irreversível."
            onConfirm={() => handleDelete(info.row.original.id)}
          />
        </div>
      ),
      header: "Ações",
    }),
  ];
  return <Table tableData={itemsData} columns={columns} />;
}

import { Button } from "@/components/ui/button";
import { DeleteAlert } from "@/components/ui/components/alerts/delele";
import { ICustomers } from "@/types/Customers";
import { Text } from "@/ui";
import { Table } from "@/ui/Table";
import { createColumnHelper } from "@tanstack/react-table";

import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/router";

const columnHelper = createColumnHelper<ICustomers>();

type ItemsTableProps = {
  customersData: ICustomers[];
  handleDelete: (id: string) => Promise<void>;
};

export function CustomerTable({
  customersData,
  handleDelete,
}: ItemsTableProps) {
  const router = useRouter();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => <Text className="text-base">{info.getValue()}</Text>,
      header: "Nome",
    }),
    columnHelper.accessor("code", {
      id: "S.No",
      cell: (info) => <Text className="text-base">{info.getValue()}</Text>,
      header: "Código",
    }),
    columnHelper.accessor("phone_number", {
      cell: (info) => <Text className="text-base">{info.getValue()}</Text>,
      header: "Telefone",
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/clientes/editar/${info.row.original.id}`)
            }
          >
            <Edit2 className="text-blue-500" size={16} />
          </Button>
          <DeleteAlert
            title="Excluir cliente"
            description="Você deseja realmente excluir essa cliente? Essa ação é irreversível e necessitará adiciona-lo novamente manualmente."
            onConfirm={() => handleDelete(info.row.original.id)}
          />
        </div>
      ),
      header: "Ações",
    }),
  ];
  return <Table tableData={customersData} columns={columns} />;
}

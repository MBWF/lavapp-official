import { ICustomers } from "@/firebase/http/customers";
import { Button, Text } from "@/ui";
import { Table } from "@/ui/Table";
import { formatCurrency } from "@/utils/formatCurrency";
import { openModal } from "@/utils/handleModal";
import { createColumnHelper } from "@tanstack/react-table";

import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/router";

const columnHelper = createColumnHelper<any>();

type ItemsTableProps = {
  customersData: ICustomers[];
  handleDelete?: (id: string) => Promise<void>;
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
    columnHelper.accessor("plan", {
      cell: (info) => <Text className="text-base">{info.getValue()}</Text>,
      header: "Plano",
    }),
    columnHelper.accessor("", {
      cell: (info) => (
        <div className="flex gap-4">
          <Button
            variant="iconButton"
            onClick={() => router.push("/clientes/criar")}
          >
            <Edit2 className="text-blue-500" size={16} />
          </Button>
          <Button variant="iconButton">
            <Trash2 color="red" size={16} />
          </Button>
        </div>
      ),
      header: "Ações",
    }),
  ];
  return <Table tableData={customersData} columns={columns} />;
}

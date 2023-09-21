import OrderIsDelivery from "@/components/OrderIsDelivery";
import OrderStatus from "@/components/OrderStatus";
import { IOrders } from "@/types/Orders";
import { Button } from "@/ui";
import { Table } from "@/ui/Table";
import { openModal } from "@/utils/handleModal";
import { createColumnHelper } from "@tanstack/react-table";

import { Edit2, Trash2 } from "lucide-react";

const columnHelper = createColumnHelper<any>();

type OrdersTableProps = {
  ordersData: IOrders[];
  handleDelete: (id: string) => void;
};

export function OrdersTable({ ordersData, handleDelete }: OrdersTableProps) {
  const columns = [
    columnHelper.accessor("order_number", {
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "Nº. Pedido",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Nome",
    }),
    columnHelper.accessor("isDelivery", {
      cell: (info) => (
        <span>
          <OrderIsDelivery isDelivery={info.getValue()} />
        </span>
      ),
      header: "Modalidade",
    }),
    columnHelper.accessor("items_number", {
      cell: (info) => <span>{info.getValue()} Peças</span>,
      header: "Tot. de peças",
    }),
    columnHelper.accessor("status", {
      cell: (info) => (
        <span>
          <OrderStatus status={info.getValue()} />
        </span>
      ),
      header: "Status",
    }),
    columnHelper.accessor("", {
      cell: (info) => (
        <div className="flex gap-4">
          <Button
            variant="iconButton"
            onClick={() => {
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
  return <Table tableData={ordersData} columns={columns} />;
}

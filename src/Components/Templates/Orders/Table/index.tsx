import OrderIsDelivery from "@/components/OrderIsDelivery";
import OrderStatus from "@/components/OrderStatus";
import { IOrders } from "@/types/Orders";
import { Button } from "@/ui";
import { Table } from "@/ui/Table";
import { openModal } from "@/utils/handleModal";
import { createColumnHelper } from "@tanstack/react-table";

import { Edit2, Eye, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const columnHelper = createColumnHelper<IOrders>();

type OrdersTableProps = {
  ordersData: IOrders[];
  setCurrentItem: Dispatch<SetStateAction<IOrders>>;
  handleDelete: (id: string) => Promise<void>;
};

export function OrdersTable({
  ordersData,
  handleDelete,
  setCurrentItem,
}: OrdersTableProps) {
  const columns = [
    columnHelper.accessor("order_number", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Nº. Pedido",
    }),
    columnHelper.accessor("name", {
      cell: (info) => (
        <span>{info.getValue() ?? info.row.original.customer?.name}</span>
      ),
      header: "Nome",
    }),
    columnHelper.accessor("isDelivery", {
      cell: (info) => (
        <span>
          <OrderIsDelivery isDelivery={!info.getValue()} />
        </span>
      ),
      header: "Modalidade",
    }),
    columnHelper.accessor("items", {
      cell: (info) => (
        <span>
          {info.row.original.items.reduce(
            (acc, elem) => (acc += Number(elem.quantity)),
            0
          )}
        </span>
      ),
      header: "Tot. de peças",
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <div className="flex gap-4">
          <div className="tooltip" data-tip="Editar">
            <Button
              variant="iconButton"
              onClick={() => {
                openModal("editItemModal");
              }}
            >
              <Edit2 className="text-blue-500" size={16} />
            </Button>
          </div>
          <div className="tooltip" data-tip="Visualizar">
            <Button
              variant="iconButton"
              onClick={() => {
                setCurrentItem(info.row.original);
                openModal("orderDetailsModal");
              }}
            >
              <Eye className="text-gray-500" size={16} />
            </Button>
          </div>
          <div className="tooltip" data-tip="Excluir">
            <Button
              variant="iconButton"
              onClick={() => handleDelete(String(info.getValue()))}
            >
              <Trash2 color="red" size={16} />
            </Button>
          </div>
        </div>
      ),
      header: "Ações",
    }),
  ];
  return <Table tableData={ordersData} columns={columns} />;
}

import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const columns = [
  columnHelper.accessor("", {
    id: "S.No",
    cell: (info) => <span>{info.row.index + 1}</span>,
    header: "Código",
  }),
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Nome",
  }),
  columnHelper.accessor("price", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Preço Individual",
  }),
  columnHelper.accessor("un", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Unidade",
  }),
];

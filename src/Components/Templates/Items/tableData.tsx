import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const columns = [
  columnHelper.accessor("", {
    id: "S.No",
    cell: (info) => <span>{info.row.index + 1}</span>,
    header: "Código",
  }),
  columnHelper.accessor("firstName", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Nome",
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Preço Individual",
  }),
  columnHelper.accessor("age", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Unidade",
  }),
];
export const fakeData = [
  {
    firstName: "Marcio",
    lastName: "Filho",
    age: 22,
    visits: 20,
    progress: "90",
  },
  {
    firstName: "Lucas",
    lastName: "Filho",
    age: 22,
    visits: 20,
    progress: "90",
  },
  {
    firstName: "Elias",
    lastName: "Filho",
    age: 22,
    visits: 20,
    progress: "90",
  },
];

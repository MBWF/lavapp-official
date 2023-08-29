import { Table } from "@/ui/Table";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export function CustomerPage() {
  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("firstName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "First Name",
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Last Name",
    }),
    columnHelper.accessor("age", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Age",
    }),
    columnHelper.accessor("visits", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Visits",
    }),
    columnHelper.accessor("progress", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Progress",
    }),
  ];
  const fakeData = [
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
  return (
    <section className="bg-white min-h-full shadow-lg p-8">
      <Table
        tableData={[...fakeData, ...fakeData, ...fakeData]}
        columns={columns}
      />
    </section>
  );
}

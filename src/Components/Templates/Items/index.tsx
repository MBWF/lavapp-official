import { Button, Heading } from "@/ui";
import { Table } from "@/ui/Table";
import { CreateItemModal } from "./Create";
import { columns, fakeData } from "./tableData";
import { openModal } from "@/utils/handleModal";

export function ItemsPage() {
  return (
    <section className="shadow-lg p-8">
      <CreateItemModal />
      <div className="flex justify-between items-center">
        <Heading>Peças</Heading>
        <Button onClick={() => openModal("createItemModal")}>Nova Peça</Button>
      </div>
      <Table
        tableData={[...fakeData, ...fakeData, ...fakeData]}
        columns={columns}
      />
    </section>
  );
}

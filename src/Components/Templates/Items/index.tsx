import { IItems } from "@/pages/pecas";
import { Button, Heading } from "@/ui";
import { Table } from "@/ui/Table";
import { openModal } from "@/utils/handleModal";
import { CreateItemModal } from "./Create";
import { columns } from "./tableData";

export function ItemsPage({ itemsData }: { itemsData: IItems[] }) {
  return (
    <section className="shadow-lg p-8">
      <CreateItemModal />
      <div className="flex justify-between items-center">
        <Heading>Peças</Heading>
        <Button onClick={() => openModal("createItemModal")}>Nova Peça</Button>
      </div>
      <Table tableData={itemsData} columns={columns} />
    </section>
  );
}

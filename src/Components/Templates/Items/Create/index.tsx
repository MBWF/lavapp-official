import { Modal } from "@/components/Modal";
import { Input, Text } from "@/ui";

export function CreateItemModal() {
  return (
    <Modal id="createItemModal" title="Nova Peça">
      <div className="flex gap-4">
        <Input label="Nome" />
        <Input label="Preço" />
      </div>
      <Input label="Código" />
    </Modal>
  );
}

import { Button, Heading, Input } from "@/ui";

export default function CreateCustomer() {
  return (
    <form className="shadow-lg p-8 flex flex-col">
      <Heading className="w-full">Novo Cliente</Heading>
      <section className="flex gap-8 my-4">
        <div>
          <Input label="Nome Completo" />

          <Input label="Telefone" />

          <Input label="CPF" />

          <Input label="Data de nascimento" />

          <Input label="Gênero" />
        </div>
        <div>
          <Input label="CEP" />
          <Input label="Rua" />
          <Input label="Bairro" />
          <Input label="Número" />
          <Input label="Complemento" />
        </div>
      </section>

      <div className="flex w-full gap-4">
        <Button className="" variant="outlined">
          Cancelar
        </Button>
        <Button className="">Cadastrar</Button>
      </div>
    </form>
  );
}

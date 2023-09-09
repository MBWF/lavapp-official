import { Button, Heading, Input } from "@/ui";
import { useRouter } from "next/router";

export default function CreateCustomer() {
  const router = useRouter();
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
        <Button
          variant="outlined"
          type="button"
          onClick={() => router.push("/clientes")}
        >
          Cancelar
        </Button>
        <Button>Cadastrar</Button>
      </div>
    </form>
  );
}

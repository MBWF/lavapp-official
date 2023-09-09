import { loginWithEmailAndPassword } from "@/firebase/auth";
import { Button, Heading, Input, Text } from "@/ui";
import { GetServerSideProps } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type IFields = {
  email: string;
  password: string;
};

export function LoginPage() {
  const { register, handleSubmit } = useForm<IFields>();

  const handleLogin: SubmitHandler<IFields> = async (data) => {
    loginWithEmailAndPassword({
      email: data.email,
      password: data.password,
    });

    toast.success("Login feito com sucesso.");
  };
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Text className="flex items-center mb-6 text-2xl text-gray-900">
          LavApp
        </Text>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 flex items-center justify-center">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
            <Heading className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Entre com sua conta.
            </Heading>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Insira seu email"
                  {...register("email")}
                />
              </div>
              <div>
                <Input
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
              </div>
              <div className="w-full flex justify-center">
                <Button className="w-1/2">Entrar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

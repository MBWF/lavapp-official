import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/Auth/useAuth";

import { SubmitHandler, useForm } from "react-hook-form";

type IFields = {
  email: string;
  password: string;
};

export function LoginPage() {
  const { signIn } = useAuth();
  const { register, handleSubmit } = useForm<IFields>();

  const handleLogin: SubmitHandler<IFields> = async (data) => {
    signIn(data);
  };
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <span className="flex items-center mb-6 text-2xl text-gray-900">
          LavApp
        </span>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 flex items-center justify-center">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Entre com sua conta.
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div>
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="Insira seu email"
                  {...register("email")}
                />
              </div>
              <div>
                <Input
                  id="password"
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
              </div>
              <div className="w-full flex justify-center">
                <Button className="w-1/2" type="submit">
                  Entrar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

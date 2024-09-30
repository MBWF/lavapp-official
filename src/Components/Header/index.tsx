import { useAuth } from "@/contexts/Auth/useAuth";
import { Button } from "@/ui";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const { logout } = useAuth();
  return (
    <div className="h-20 shadow-md">
      <div className="flex justify-between w-full">
        <div className="relative h-20 w-36">
          <Link href="/home">
            <Image fill alt="Logo Lavanderia" src="/lav-logo.png" />
          </Link>
        </div>
      </div>
      <div className="mx-10">
        <div className="w-32 ">
          <Button className="w-full h-6" onClick={logout}>
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}

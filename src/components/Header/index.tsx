import { useAuth } from "@/contexts/Auth/useAuth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
  const { logout } = useAuth();
  return (
    <div className="h-20 shadow-md flex items-center">
      <div className="flex justify-between w-full">
        <div className="relative h-20 w-36">
          <Link href="/home">
            <Image fill alt="Logo Lavanderia" src="/lav-logo.png" />
          </Link>
        </div>
      </div>
      <div className="mx-10">
        <Button className="w-24" onClick={logout}>
          Sair
        </Button>
      </div>
    </div>
  );
}

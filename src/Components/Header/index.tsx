import { useAuth } from "@/contexts/Auth/useAuth";
import { Button, Dropdown } from "@/ui";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const { logout } = useAuth();
  return (
    <div className="navbar h-20 shadow-md">
      <div className="flex justify-between w-full">
        <Link href="/home">
          <Image
            width={200}
            height={60}
            alt="Logo Lavanderia"
            src="/lav-logo.png"
          />
        </Link>
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

import { Dropdown } from "@/ui";
import Link from "next/link";

export function Header() {
  return (
    <div className="navbar h-20 shadow-md">
      <div className="flex-1">
        <Link href="/home" className="btn btn-ghost normal-case text-xl">
          LavApp
        </Link>
      </div>
      <div className="flex-none gap-20">
        <div className="form-control">
          <input type="checkbox" className="toggle" />
        </div>
        <div className="mx-16">
          <Dropdown items={[1, 2]}>
            <h2>ola mundo</h2>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

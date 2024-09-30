import Link from "next/link";
import { ReactNode } from "react";

type DropdownProps = {
  children: ReactNode;
  items: any[];
};

export function Dropdown({ children, items }: DropdownProps) {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        {children}
      </label>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        {items.map((item) => (
          <li key={item.name}>
            <Link href="" className="justify-between">
              Profile
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

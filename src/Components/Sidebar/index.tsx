import Link from "next/link";
import { routes } from "./sidebarData";
import { Text } from "@/ui";

export function Sidebar() {
  return (
    <div className="flex flex-col h-full p-3 shadow-lg w-60">
      <ul className="pt-2 pb-4 space-y-4 text-sm">
        {routes.map((route) => (
          <li className="rounded-sm" key={route.path}>
            <Link
              href={route.path}
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              {route.img}
              <Text className="text-base">{route.name}</Text>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

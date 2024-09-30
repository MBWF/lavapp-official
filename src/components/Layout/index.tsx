import { ReactNode } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";


type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex min-h-[calc(100%-5rem)]">
        <Sidebar />
        <div className="m-8 w-full h-fit">{children}</div>
      </div>
    </div>
  );
}

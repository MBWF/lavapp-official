import { ReactNode } from "react";
import { Header, Sidebar } from "..";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-[calc(100%-5rem)]">
        <Sidebar />
        <div className="m-16">{children}</div>
      </div>
    </div>
  );
}

import { Heading } from "@/ui";
import { ReactNode } from "react";

type ModalProps = {
  title: string;
  children: ReactNode;
  id: string;
};

export function Modal({ title, children, id }: ModalProps) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <div className="flex items-center w-full justify-between">
          <Heading className="font-bold text-2xl">{title}</Heading>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
        </div>
        {children}
      </div>
    </dialog>
  );
}

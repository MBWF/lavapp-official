import { Heading } from "@/ui";
import { ReactNode } from "react";

type ModalProps = {
  title: string;
  children: ReactNode;
  id: string;
  onCloseModal: () => void;
};

export function Modal({ title, children, id, onCloseModal }: ModalProps) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <div className="flex items-center w-full justify-between">
          <Heading className="font-bold text-2xl">{title}</Heading>
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={onCloseModal}
            >
              ✕
            </button>
          </form>
        </div>
        {children}
      </div>
    </dialog>
  );
}

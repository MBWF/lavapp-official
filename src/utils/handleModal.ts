export function openModal(id: string) {
  document.querySelector<HTMLDialogElement>(`#${id}`)?.showModal();
}

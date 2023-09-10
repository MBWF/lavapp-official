export function openModal(id: string) {
  document.querySelector<HTMLDialogElement>(`#${id}`)?.showModal();
}

export function closeModal(id: string) {
  document.querySelector<HTMLDialogElement>(`#${id}`)?.close();
}

import { format, parseISO } from "date-fns";

export function convertDateToInput(date: string) {
  const data = new Date(date);

  const year = data.getFullYear();
  const month = String(data.getMonth() + 1).padStart(2, "0");
  const day = String(data.getDate()).padStart(2, "0");

  let formatedDate = `${year}-${month}-${day}T13:00:00`;

  return formatedDate;
}

export function convertDateToShow(date: string) {
  const data = parseISO(date);
  const formatedDate = format(data, "dd/MM/yyyy");
  return formatedDate;
}

import { format, parseISO } from "date-fns";

export function convertDateToInput(date: string) {
  const data = new Date(date);

  const year = data.getFullYear();
  const month = String(data.getMonth() + 1).padStart(2, "0");
  const day = String(data.getDate()).padStart(2, "0");

  const formatedDate = `${year}-${month}-${day}`;

  return formatedDate;
}

export function convertDateToShow(date: string) {
  const data = parseISO(date);

  return format(data, "dd/MM/yyyy");
}

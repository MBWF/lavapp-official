export default function translateOrder(status: string) {
  if (status === "FINISHED") return "Finalizado";

  return "Em Processo";
}

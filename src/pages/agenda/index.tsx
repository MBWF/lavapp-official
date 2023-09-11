import { Layout } from "@/components";
import Calendar from "@/components/FullCalendar";

export default function Pedidos() {
  return (
    <Layout>
      <Calendar
        initialEvents={[
          {
            title: "Cliente 01",
            start: "2023-09-12T10:30:00",
            end: "2023-09-12T11:30:00",
          },
          {
            title: "Cliente 02",
            start: "2023-09-12T10:30:00",
            end: "2023-09-12T16:30:00",
          },
          {
            title: "Cliente 03",
            start: "2023-09-12T12:30:00",
          },
        ]}
      />
    </Layout>
  );
}

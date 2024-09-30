import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Templates/Home";
import { getTodayOrders } from "@/firebase/http/Orders";
import { IOrders } from "@/types/Orders";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [todayOrders, setTodayOrders] = useState<IOrders[]>([]);

  useQuery({
    queryKey: ["orders"],
    queryFn: () => getTodayOrders(setTodayOrders),
    refetchOnWindowFocus: false,
  });

  return (
    <Layout>{todayOrders && <Dashboard todayOrders={todayOrders} />}</Layout>
  );
}

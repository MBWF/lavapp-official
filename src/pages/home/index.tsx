import { Layout } from "@/components";
import { HomePage } from "@/components/Templates/Home";
import { getTodayOrders } from "@/firebase/http/Orders";
import { IOrders } from "@/types/Orders";
import { useEffect, useState } from "react";

export default function Home() {
  const [todayOrders, setTodayOrders] = useState<IOrders[]>([]);

  useEffect(() => {
    getTodayOrders(setTodayOrders);
  }, []);

  return (
    <Layout>{todayOrders && <HomePage todayOrders={todayOrders} />}</Layout>
  );
}


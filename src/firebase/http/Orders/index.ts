import { db } from "@/firebase/firebase";
import { IOrders } from "@/types/Orders";
import {
  Unsubscribe,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

const OrdersCollectionRef = collection(db, "orders");

export const getOrders = async () => {
  const data = await getDocs(OrdersCollectionRef);

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getTodayOrders = async (
  setTodayOrders: Dispatch<SetStateAction<IOrders[]>>
) => {
  let unsubscribe: Unsubscribe;

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isoToday = today.toISOString().split("T")[0] + "T00:00:00";
  const isoTomorrow = tomorrow.toISOString().split("T")[0] + "T00:00:00";

  try {
    const getTodayOrdersQuery = query(
      OrdersCollectionRef,
      where("delivery_date", ">", isoToday),
      where("delivery_date", "<", isoTomorrow)
    );

    unsubscribe = onSnapshot(getTodayOrdersQuery, (snapshot) => {
      let docs: any[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;

        docs.push({ ...data, id });
      });

      setTodayOrders(docs);
    });
  } catch (err) {
    console.error(err);
  }

  return () => unsubscribe();
};

export const createOrder = async (data: IOrders, lastOrderNumber: number) => {
  await addDoc(OrdersCollectionRef, {
    ...data,
    order_number: lastOrderNumber + 1,
  });
};

export const deleteOrder = async (orderId: string) => {
  const orderDoc = doc(db, "orders", orderId);
  await deleteDoc(orderDoc);
};

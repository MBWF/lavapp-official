import { db } from "@/firebase/firebase";
import { IOrders } from "@/types/Orders";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

const OrdersCollectionRef = collection(db, "orders");

export const getOrders = async () => {
  const data = await getDocs(OrdersCollectionRef);

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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

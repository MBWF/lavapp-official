import { db } from "@/firebase/firebase";
import { IOrders } from "@/types/Orders";
import { ORDER_STATUS } from "@/utils/OrderStatus";
import {
  Unsubscribe,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

const OrdersCollectionRef = collection(db, "orders");

function handleNextStatus(currentStatusId: number) {
  const nextStatus = ORDER_STATUS.find(
    (status) => currentStatusId + 1 === status.id
  );

  return nextStatus;
}

function handlePreviousStatus(currentStatusId: number) {
  const previousStatus = ORDER_STATUS.find(
    (status) => currentStatusId - 1 === status.id
  );

  return previousStatus;
}

export const getOrders = async () => {
  const data = await getDocs(OrdersCollectionRef);

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IOrders[];
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

export const handleNextOrderStatus = async (
  currentStatusId: number,
  orderId: string
) => {
  if (currentStatusId >= 5) return;
  const nextStep = handleNextStatus(currentStatusId);

  const orderDoc = doc(db, "orders", orderId);

  const newData = {
    status: nextStep,
  };

  await updateDoc(orderDoc, newData);
};

export const handlePreviousOrderStatus = async (
  currentStatusId: number,
  orderId: string
) => {
  if (currentStatusId <= 1) return;
  const previousStep = handlePreviousStatus(currentStatusId);

  const orderDoc = doc(db, "orders", orderId);

  const newData = {
    status: previousStep,
  };

  await updateDoc(orderDoc, newData);
};
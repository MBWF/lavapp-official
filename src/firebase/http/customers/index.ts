import { db } from "@/firebase/firebase";
import { ICustomers } from "@/types/Customers";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const customersCollectionRef = collection(db, "customers");

export const getCustomers = async () => {
  const data = await getDocs(customersCollectionRef);

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const createCustomer = async (data: ICustomers) => {
  await addDoc(customersCollectionRef, {
    ...data,
  });
};

// export const editItem = async (data: IItem, itemId: string) => {
//   const currentItem = doc(db, "items", itemId);
//   await updateDoc(currentItem, {
//     ...data,
//   });
// };

// export const deleteItem = async (itemId: string) => {
//   const itemDoc = doc(db, "items", itemId);
//   await deleteDoc(itemDoc);
// };

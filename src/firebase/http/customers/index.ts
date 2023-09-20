import { db } from "@/firebase/firebase";
import { ICustomers } from "@/types/Customers";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const customersCollectionRef = collection(db, "customers");

export const getCustomers = async () => {
  const data = await getDocs(customersCollectionRef);

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getCustomersById = async (id: string) => {
  const docCustomerRef = doc(db, "customers", id);

  const data = await getDoc(docCustomerRef);

  return data.data();
};

export const createCustomer = async (data: ICustomers) => {
  await addDoc(customersCollectionRef, {
    ...data,
  });
};

export const editCustomer = async (data: ICustomers, customerId: string) => {
  const currentCustomer = doc(db, "customers", customerId);
  await updateDoc(currentCustomer, {
    ...data,
  });
};

// export const deleteItem = async (itemId: string) => {
//   const itemDoc = doc(db, "items", itemId);
//   await deleteDoc(itemDoc);
// };

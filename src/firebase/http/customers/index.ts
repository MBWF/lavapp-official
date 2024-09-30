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

  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ICustomers[];
};

export const getCustomersById = async (customerId: string) => {
  const docCustomerRef = doc(db, "customers", customerId);

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

export const deleteCustomer = async (customerId: string) => {
  const customerDoc = doc(db, "customers", customerId);
  await deleteDoc(customerDoc);
};

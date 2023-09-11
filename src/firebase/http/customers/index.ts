import { db } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export type ICustomers = {
  id: string;
  name: string;
  code: string;
  birthdate: string;
  cpf: string;
  gender: string;
  phone_number: string;
  plan: string;
  address: {
    zip_code: string;
    district: string;
    number: string;
    street: string;
    complement: string;
  };
};

const customersCollectionRef = collection(db, "customers");

export const getCustomers = async () => {
  const data = await getDocs(customersCollectionRef);

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// export const createItem = async (data: IItem) => {
//   await addDoc(customersCollectionRef, {
//     ...data,
//   });
// };

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

import { db } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

type IItem = {
  name: string;
  price: number;
  un: string;
};

const itemsCollectionRef = collection(db, "items");

export const getItems = async () => {
  const data = await getDocs(itemsCollectionRef);

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const createItem = async (data: IItem) => {
  await addDoc(itemsCollectionRef, {
    ...data,
  });
};

export const editItem = async (data: IItem, itemId: string) => {
  const currentItem = doc(db, "items", itemId);
  await updateDoc(currentItem, {
    ...data,
  });
};

export const deleteItem = async (itemId: string) => {
  const itemDoc = doc(db, "items", itemId);
  await deleteDoc(itemDoc);
};

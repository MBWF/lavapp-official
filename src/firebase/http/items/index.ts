import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const itemsCollectionRef = collection(db, "items");

export const getItems = async () => {
  const data = await getDocs(itemsCollectionRef);

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

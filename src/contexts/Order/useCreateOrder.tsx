import { db } from "@/firebase/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type CreateOrderContextType = {
  currentStep: number;
  lastOrderNumber: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
};

type AuthContextProps = {
  children: ReactNode;
};

const OrdersCollectionRef = collection(db, "orders");

export const CreateOrderContext = createContext({} as CreateOrderContextType);

export function CreateOrderProvider({ children }: AuthContextProps) {
  const [lastOrderNumber, setLastOrderNumber] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    if (currentStep === 4) return;
    setCurrentStep((state) => state + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep === 1) return;
    setCurrentStep((state) => state - 1);
  };

  useEffect(() => {
    const allOrdersQuery = query(
      OrdersCollectionRef,
      orderBy("order_number", "asc")
    );

    const unSub = onSnapshot(allOrdersQuery, (snapshot) => {
      const allOrdersOrderedByNumber = snapshot.docs.map((doc) => ({
        order_number: doc.data().order_number,
      }));
      setLastOrderNumber(
        allOrdersOrderedByNumber[allOrdersOrderedByNumber.length - 1]
          .order_number
      );
    });

    return unSub;
  }, []);

  return (
    <CreateOrderContext.Provider
      value={{
        currentStep,
        handleNextStep,
        handlePreviousStep,
        lastOrderNumber,
      }}
    >
      {children}
    </CreateOrderContext.Provider>
  );
}

export function useCreateOrder() {
  const context = useContext(CreateOrderContext);

  if (!context) {
    throw new Error(
      "useCreateOrder must be used within an CreateOrderProvider"
    );
  }

  return context;
}

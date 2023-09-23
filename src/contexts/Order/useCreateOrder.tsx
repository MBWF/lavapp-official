import { ReactNode, createContext, useContext, useState } from "react";

type CreateOrderContextType = {
  currentStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
};

type AuthContextProps = {
  children: ReactNode;
};

export const CreateOrderContext = createContext({} as CreateOrderContextType);

export function CreateOrderProvider({ children }: AuthContextProps) {
  //   const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    if (currentStep === 4) return;
    setCurrentStep((state) => state + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep === 1) return;
    setCurrentStep((state) => state - 1);
  };

  return (
    <CreateOrderContext.Provider
      value={{ currentStep, handleNextStep, handlePreviousStep }}
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

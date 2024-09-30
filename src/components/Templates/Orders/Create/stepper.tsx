import { Check } from "lucide-react";

interface OrderCreationStepperProps {
  currentStep: number;
}

const creationSteps: { step: number; label: string }[] = [
  { step: 1, label: "Cliente" },
  { step: 2, label: "Peças" },
  { step: 3, label: "Entrega" },
  { step: 4, label: "Confirmação" },
];

export default function OrderCreationStepper({
  currentStep,
}: OrderCreationStepperProps) {
  const currentStepIndex = creationSteps.findIndex(
    (s) => s.step === currentStep
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      <ol className="flex items-center w-full mb-4">
        {creationSteps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isActive = index === currentStepIndex;
          return (
            <li
              key={step.step}
              className={`flex items-center ${
                index !== creationSteps.length - 1 ? "w-full" : ""
              }`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    isActive
                      ? "bg-primary border-primary scale-110 shadow-lg"
                      : isCompleted
                      ? "bg-primary border-primary"
                      : "bg-background border-muted"
                  }`}
                >
                  {isCompleted ? (
                    <Check
                      className={`w-6 h-6 ${
                        isActive
                          ? "text-primary-foreground animate-pulse"
                          : "text-primary-foreground"
                      }`}
                    />
                  ) : (
                    <span
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-primary scale-110"
                      : isCompleted
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index !== creationSteps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-all duration-200 ${
                    index < currentStepIndex ? "bg-primary" : "bg-muted"
                  }`}
                ></div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

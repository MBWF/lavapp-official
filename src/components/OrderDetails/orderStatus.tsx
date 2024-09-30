import React, { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatus, statusSteps } from "@/types/Orders";

interface OrderStatusStepperProps {
  initialStatus: OrderStatus;
  onStatusChange?: (newStatus: OrderStatus) => void;
  hasButtons?: boolean;
}

export default function OrderStatusStepper({
  initialStatus,
  onStatusChange,
  hasButtons = false,
}: OrderStatusStepperProps) {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const currentStep = statusSteps.findIndex(
    (step) => step.status === currentStatus
  );

  const handlePrevious = () => {
    if (currentStep > 0) {
      const newStatus = statusSteps[currentStep - 1].status;
      setCurrentStatus(newStatus);
      onStatusChange?.(newStatus);
    }
  };

  const handleNext = () => {
    if (currentStep < statusSteps.length - 1) {
      const newStatus = statusSteps[currentStep + 1].status;
      setCurrentStatus(newStatus);
      onStatusChange?.(newStatus);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <ol className="flex items-center w-full mb-4">
        {statusSteps.map((step, index) => {
          const isCompleted = index <= currentStep;
          const isActive = index === currentStep;
          return (
            <li
              key={step.status}
              className={`flex items-center ${
                index !== statusSteps.length - 1 ? "w-full" : ""
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
              {index !== statusSteps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-all duration-200 ${
                    index < currentStep ? "bg-primary" : "bg-muted"
                  }`}
                ></div>
              )}
            </li>
          );
        })}
      </ol>
      {hasButtons && (
        <div className="flex justify-between mt-6">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === statusSteps.length - 1}
            variant="outline"
            className="flex items-center"
          >
            Próximo
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}

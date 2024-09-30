export function OrderStatusHandler({ currentStep }: { currentStep: number }) {
  return (
    <ul className="steps w-full">
      <li
        data-content="1"
        className={`step ${currentStep > 0 && "step-success"} text-xl`}
      >
        Triagem
      </li>
      <li
        data-content="2"
        className={`step ${currentStep > 1 && "step-success"} text-xl`}
      >
        Lavando
      </li>
      <li
        data-content="3"
        className={`step ${currentStep > 2 && "step-success"} text-xl`}
      >
        Passando
      </li>
      <li
        data-content="4"
        className={`step ${currentStep > 3 && "step-success"} text-xl`}
      >
        Pronto
      </li>
      <li
        data-content="✓"
        className={`step ${currentStep > 4 && "step-success"} text-xl`}
      >
        Entregue
      </li>
    </ul>
  );
}

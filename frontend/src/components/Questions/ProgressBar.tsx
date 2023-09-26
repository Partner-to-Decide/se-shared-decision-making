import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const steps: JSX.Element[] = []; // Explicitly define the type as JSX.Element[]

  // Create an array of step numbers based on the total number of questions
  for (let step = 1; step <= totalSteps; step++) {
    const isActive = step <= currentStep;
    steps.push(
      <div
        key={step}
        className={`step ${isActive ? 'active' : ''}`}
      >
        {step}
      </div>
    );
  }

  return (
    <div className="progress-bar">
      {steps}
    </div>
  );
}

export default ProgressBar;

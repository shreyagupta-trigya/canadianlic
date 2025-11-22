import React from "react";
import { cn } from "@/lib/utils";

const Stepper = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full bg-white border rounded-xl p-6 shadow-sm">
      <div className="relative flex items-center justify-between">

        {/* Connector Background */}
        <div className="absolute top-6 left-0 right-0 h-[3px] bg-gray-200 rounded-full">
          <div
            className="h-[3px] bg-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{
              width:
                steps.length > 1
                  ? `${(currentStep / (steps.length - 1)) * 100}%`
                  : "0%",
            }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div
              key={index}
              className="relative flex flex-col items-center w-full text-center z-10"
            >
              {/* Step Circle */}
              <button
                type="button"
                onClick={() => onStepClick(index)}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full border-[2.5px] transition-all duration-300",

                  isCompleted
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                    : isActive
                    ? "bg-white border-blue-600 text-blue-600 shadow-sm"
                    : "bg-white border-gray-300 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="sr-only">Step</span>
                )}
              </button>

              {/* Labels */}
              <div className="mt-3 leading-tight">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isCompleted || isActive ? "text-black" : "text-gray-400"
                  )}
                >
                  {step.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;

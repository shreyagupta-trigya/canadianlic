import React from "react";
import { cn } from "@/lib/utils";

const Stepper = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full bg-white border rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-6 left-[calc(5%)] right-[calc(5%)] w-[90%] h-[2px] bg-gray-200">
          <div
            className="h-[2px] bg-blue-500 transition-all duration-500 ease-in-out rounded-full"
            style={{
              width:
                steps.length > 1
                  ? `calc(${(currentStep / (steps.length - 1)) * 100}% - 2%)`
                  : "0%",
            }}
          ></div>
        </div>

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div
              key={index}
              className="relative flex flex-col items-center w-full text-center z-10"
            >
              {/* Step Button */}
              <button
                type="button"
                onClick={() => onStepClick(index)}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-all duration-300",
                  isCompleted
                    ? "bg-blue-500 border-blue-500 text-white"
                    : isActive
                    ? "border-blue-500 text-blue-600 bg-white"
                    : "border-gray-300 text-gray-400 bg-white"
                )}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>

              {/* Step Label */}
              <div className="mt-2 flex flex-col items-center">
                <span
                  className={cn(
                    "text-sm font-semibold",
                    isActive || isCompleted
                      ? "text-gray-900"
                      : "text-gray-400"
                  )}
                >
                  {step.title}
                </span>
                {step.subtitle && (
                  <span className="text-xs text-gray-400">
                    {step.subtitle}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;

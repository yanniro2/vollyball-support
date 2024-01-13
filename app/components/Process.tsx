"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type Step = {
  label: string;
  color: string;
  id: number;
};

const steps: Step[] = [
  { label: "Amount", color: "#EF0325", id: 1 },
  { label: "Details", color: "#E1E1E6", id: 2 },
  { label: "Payment", color: "#E1E1E6", id: 3 },
];

const Process = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const pathname = usePathname();

  useEffect(() => {
    // Determine the step based on the pathname
    if (pathname === "/support/amount") {
      setCurrentStep(1);
    } else if (pathname === "/support/details") {
      setCurrentStep(2);
    } else if (pathname === "/support/payment") {
      setCurrentStep(3);
    } else {
      // Default to step 1 if the pathname doesn't match any specific step
      setCurrentStep(1);
    }
  }, [pathname]);

  return (
    <div className="bg-[#F5F8FA] rounded-full p-3 px-[2rem] flex items-center justify-between">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 ${
            currentStep >= index + 1 ? "font-semibold" : ""
          }`}>
          <div
            className={`w-[2rem] h-[2rem] bg-${
              step.color
            } flex items-center justify-center text-white rounded-full ${
              currentStep > index + 1 ? "bg-opacity-50" : ""
            }`}>
            {index + 1}
          </div>
          <div
            className={`w-[2rem] h-[2rem]  rounded-full flex items-center justify-center text-white ${
              currentStep > index ? "bg-[#EF0325]" : "bg-[#E1E1E6]"
            }`}>
            {step.id}
          </div>
          <h3
            className={`capitalize ${
              currentStep === index + 1 ? "text-black" : "text-[#6B7578]"
            }`}>
            {step.label}
          </h3>
          {index < steps.length - 1 && (
            <svg
              width="6"
              height="12"
              viewBox="0 0 6 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-[5rem]">
              <path
                d="M1 1L4.58579 4.58579C5.36684 5.36684 5.36683 6.63317 4.58579 7.41421L1 11"
                stroke={currentStep > index + 1 ? "#EF0325" : "#E1E1E6"}
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default Process;

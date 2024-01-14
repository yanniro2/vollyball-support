"use client";
import CustomInput from "@/app/components/CustomInput";
import Link from "next/link";
import React, { useState } from "react";

type InputField = {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: RegExp;
  errorMessage?: string;
  sample: string;
};

const inputFields: InputField[] = [
  {
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    value: "",
    onChange: () => {},
    pattern: /^[A-Za-z ]+$/,
    errorMessage: "Only letters and spaces are allowed",
    sample: "John / john / david",
  },
  {
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    value: "",
    onChange: () => {},
    pattern: /^[A-Za-z ]+$/,
    errorMessage: "Only letters and spaces are allowed.",
    sample: "Doe / doe / smith",
  },
  {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    value: "",
    onChange: () => {},
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: "Invalid input. Please enter a valid email address.",
    sample: "john@example.com / jane@example.com",
  },
  {
    label: "Mobile Number",
    type: "tel",
    placeholder: "Enter your mobile number",
    value: "",
    onChange: () => {},
    pattern: /^(\+\d{1,4})?(\s?\d{1,})$/,
    errorMessage:
      "Only numbers and an optional country code with spaces are allowed.",
    sample: "+123 456789 / 7890123456",
  },
];

const Page = () => {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    [key: string]: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState<{
    [key: string]: string | null;
  }>({});

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: null,
    }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    inputFields.forEach((inputField) => {
      const { label, pattern, errorMessage } = inputField;
      const value = (formData[label.toLowerCase()] || "").trim();

      if (pattern && !pattern.test(value)) {
        newErrors[label.toLowerCase()] = errorMessage || "Invalid input.";
      }
    });

    setErrors(newErrors);
    setIsFormValid(Object.values(newErrors).every((error) => !error));
  };

  const handleContinueToPayment = () => {
    if (isFormValid) {
      console.log("Continue to Payment clicked!");
    }
  };

  return (
    <div className="flex flex-col p-3 gap-3 pb-0">
      <div className="gap-5 grid grid-rows-2 grid-cols-2">
        {inputFields.map((inputField, index) => (
          <CustomInput
            key={index}
            label={inputField.label}
            type={inputField.type}
            placeholder={inputField.placeholder}
            value={formData[inputField.label.toLowerCase()]}
            onChange={(e) =>
              handleInputChange(inputField.label.toLowerCase(), e.target.value)
            }
            onBlur={validateForm}
            pattern={inputField.pattern}
            errorMessage={inputField.errorMessage}
            sample={inputField.sample}
            error={errors[inputField.label.toLowerCase()]}
          />
        ))}
      </div>

      <div className="flex items-center justify-center p-[1rem]">
        <Link
          onClick={handleContinueToPayment}
          // disabled={!isFormValid}
          href={"/payment"}
          className={`${
            isFormValid ? "btn-primary-active " : "btn-primary"
          } font-poppins`}>
          Continue to Payment
          <svg
            width="58"
            height="58"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect
              width="58"
              height="58"
              rx="29"
              fill="white"
              fill-opacity="0.22"
            />
            <path
              d="M32.0375 20.475C32.275 20.475 32.5125 20.5625 32.7 20.75L40.2875 28.3375C40.65 28.7 40.65 29.3 40.2875 29.6625L32.7 37.25C32.3375 37.6125 31.7375 37.6125 31.375 37.25C31.0125 36.8875 31.0125 36.2875 31.375 35.925L38.3 29L31.375 22.075C31.0125 21.7125 31.0125 21.1125 31.375 20.75C31.55 20.5625 31.8 20.475 32.0375 20.475Z"
              fill="white"
            />
            <path
              d="M18.3751 28.0625L39.4126 28.0625C39.9251 28.0625 40.3501 28.4875 40.3501 29C40.3501 29.5125 39.9251 29.9375 39.4126 29.9375L18.3751 29.9375C17.8626 29.9375 17.4376 29.5125 17.4376 29C17.4376 28.4875 17.8626 28.0625 18.3751 28.0625Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Page;

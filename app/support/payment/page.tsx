"use client";
import CustomInput from "@/app/components/CustomInput";
import Link from "next/link";
import React, { useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import Image from "next/image";
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

type PaymentOption = "masterVisa" | "paypal";

const paymentOptions: PaymentOption[] = ["masterVisa", "paypal"];

const inputFields: InputField[] = [
  {
    label: "Cardholder's Name",
    type: "text",
    placeholder: "Enter cardholder's name",
    value: "",
    onChange: () => {},
    pattern: /^[A-Za-z ]+$/,
    errorMessage: "Only letters and spaces are allowed",
    sample: "John Doe",
  },
  {
    label: "Card Number",
    type: "text",
    placeholder: "Enter your card number",
    value: "",
    onChange: () => {},
    pattern: /^[0-9]+$/,
    errorMessage: "Only numbers are allowed",
    sample: "1234567812345678",
  },
  {
    label: "Expiration Date",
    type: "text",
    placeholder: "Enter expiration date",
    value: "",
    onChange: () => {},
    pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
    errorMessage: "Please enter a valid expiration date (MM/YY).",
    sample: "12/23",
  },
  {
    label: "CVV",
    type: "text",
    placeholder: "Enter CVV",
    value: "",
    onChange: () => {},
    pattern: /^[0-9]{3,4}$/,
    errorMessage: "Please enter a valid CVV (3 or 4 digits).",
    sample: "123",
  },
  {
    label: "Zip Code",
    type: "text",
    placeholder: "Enter zip code",
    value: "",
    onChange: () => {},
    pattern: /^[0-9]+$/,
    errorMessage: "numbers are allowed",
    sample: "12345",
  },
];

const Page = () => {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    [key: string]: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<{
    [key: string]: string | null;
  }>({});

  const [isFormValid, setIsFormValid] = useState(false);

  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<PaymentOption | null>(null);

  const handlePaymentOptionChange = (option: PaymentOption) => {
    setSelectedPaymentOption(option);
    setErrors({});
  };

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

  const renderPaymentFields = () => {
    switch (selectedPaymentOption) {
      case "masterVisa":
        return (
          <div className="flex w-full h-full flex-col gap-5 py-5">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-xl font-poppins font-semibold">
                Payment method : Master / Visa card
              </h1>

              <Image src="/card.png" width={100} height={100} alt="img"></Image>
            </div>

            <div className="gap-5 grid grid-rows-2 grid-cols-2">
              {inputFields.map((inputField, index) => (
                <CustomInput
                  key={index}
                  label={inputField.label}
                  type={inputField.type}
                  placeholder={inputField.placeholder}
                  value={formData[inputField.label.toLowerCase()]}
                  onChange={(e) =>
                    handleInputChange(
                      inputField.label.toLowerCase(),
                      e.target.value
                    )
                  }
                  onBlur={validateForm}
                  pattern={inputField.pattern}
                  errorMessage={inputField.errorMessage}
                  sample={inputField.sample}
                  error={errors[inputField.label.toLowerCase()]}
                />
              ))}
            </div>
          </div>
        );
      case "paypal":
        return (
          <div className="flex w-full h-full flex-col gap-5 py-5">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-xl font-poppins font-semibold">
                Payment method : Paypal
              </h1>

              <Image
                src="/paypal.png"
                width={100}
                height={100}
                alt="img"></Image>
            </div>

            <div className="flex flex-col gap-3 w-full">
              {/* <h3 className="font-medium font-poppins capitalize">paypal</h3> */}
              <p className="text-[#898989] text-sm flex items-center w-full gap-1">
                You can use Paypal Payment Method by clicking
                <Link href="connect" className="underline text-[#EF0325]">
                  Connect
                </Link>
              </p>
              <Link
                onClick={() => {
                  // Implement logic to connect to PayPal account
                  console.log("Connect to PayPal clicked!");
                }}
                className="btn-second font-poppins"
                // disabled={!isFormValid}
                href="/connet">
                Connect
              </Link>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleContinueToPayment = () => {
    if (isFormValid) {
      console.log("Continue to Payment clicked!");
    }
  };

  return (
    <div className="flex flex-col p-3 gap-3 pb-0">
      <div className="flex items-center justify-center gap-5">
        {paymentOptions.map((option) => (
          <div
            key={option}
            onClick={() => handlePaymentOptionChange(option)}
            className={`cursor-pointer flex items-center gap-1 ${
              selectedPaymentOption === option
                ? "border-primary text-white  font-medium bg-[#EF0325]"
                : "border-gray-300 text-gray-500"
            } border p-2 rounded-md`}>
            {option === "masterVisa" ? "" : "PayPal"}
            {option === "masterVisa" ? (
              <div className="flex items-center gap-1">
                <FaCcMastercard />
                Master /
                <FaCcVisa /> Visa
              </div>
            ) : (
              <FaCcPaypal />
            )}
          </div>
        ))}
      </div>

      {renderPaymentFields()}

      <div className="flex items-center justify-center p-[1rem] flex-col">
        <Link
          onClick={handleContinueToPayment}
          // disabled={!isFormValid}
          className={`${
            isFormValid ? "btn-primary-active " : "btn-primary"
          } font-poppins`}
          href={"/support/success"}>
          Make payment
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
              d="M36.5 26.5L36.5 24C36.5 19.8625 35.25 16.5 29 16.5C22.75 16.5 21.5 19.8625 21.5 24L21.5 26.5"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M29 37.125C27.2741 37.125 25.875 35.7259 25.875 34C25.875 32.2741 27.2741 30.875 29 30.875C30.7259 30.875 32.125 32.2741 32.125 34C32.125 35.7259 30.7259 37.125 29 37.125Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.75 41.5L35.25 41.5C40.25 41.5 41.5 40.25 41.5 35.25L41.5 32.75C41.5 27.75 40.25 26.5 35.25 26.5L22.75 26.5C17.75 26.5 16.5 27.75 16.5 32.75L16.5 35.25C16.5 40.25 17.75 41.5 22.75 41.5Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>

        <Link
          href="secure"
          className="flex items-center gap-1 p-3 hover:text-[#EF0325] transition-all">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.4252 9.26658C17.4252 13.3416 14.4669 17.1582 10.4252 18.2749C10.1502 18.3499 9.85019 18.3499 9.57519 18.2749C5.53352 17.1582 2.5752 13.3416 2.5752 9.26658V5.60824C2.5752 4.92491 3.09187 4.14991 3.73354 3.89157L8.37519 1.9916C9.41685 1.5666 10.5919 1.5666 11.6335 1.9916L16.2752 3.89157C16.9085 4.14991 17.4335 4.92491 17.4335 5.60824L17.4252 9.26658Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.0002 10.4166C10.9206 10.4166 11.6668 9.67039 11.6668 8.74992C11.6668 7.82944 10.9206 7.08325 10.0002 7.08325C9.07969 7.08325 8.3335 7.82944 8.3335 8.74992C8.3335 9.67039 9.07969 10.4166 10.0002 10.4166Z"
              stroke="black"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 10.4165V12.9165"
              stroke="black"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className="font-poppins  underline ">Secure Payment</span>
        </Link>
      </div>
    </div>
  );
};

export default Page;

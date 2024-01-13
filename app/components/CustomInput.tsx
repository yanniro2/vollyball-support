"use client";
import React from "react";

type InputProps = {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  pattern?: RegExp;
  errorMessage?: string;
  sample: string;
  error?: string | null;
};

const CustomInput: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  pattern,
  errorMessage,
  sample,
  error,
}) => (
  <div className="w-full flex flex-col gap-1">
    <label
      htmlFor={label}
      className={`font-poppins ${error ? "text-red-500" : ""}`}>
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`bg-[#F5F8FA] p-3 w-full rounded-xl outline-none font-normal pl-[1.5rem] ${
        error ? "outline-red-500" : ""
      }`}
      pattern={pattern?.toString()}
    />
    <p className="text-gray-400 text-sm">Example: {sample}</p>
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

export default CustomInput;

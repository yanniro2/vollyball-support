"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const defaultAmounts = [10, , 25, 50, 100];

type Props = {};

const Page = (props: Props) => {
  // new url get

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  //////
  const [donationAmount, setDonationAmount] = useState<number>(
    parseInt(searchParams.get("amount") || "0")
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // // Use a regular expression to allow only numeric input
    // const numericInput = inputValue.replace(/[^0-9.]/g, "");

    // // Update the state with the numeric input
    // setDonationAmount(parseFloat(numericInput));
    // const params = new URLSearchParams(searchParams);
    // if (inputValue) {
    //   params.set("amount", inputValue);
    // } else {
    //   params.delete("amount");
    // }

    // replace(`${pathname}?${params.toString()}`);
    setDonationAmount(parseFloat(inputValue));
    const amountString = inputValue.toString();
    const params = new URLSearchParams(searchParams);
    params.set("amount", amountString);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleButtonClick = (amount: number) => {
    setDonationAmount(amount);
    const amountString = amount.toString();
    const params = new URLSearchParams(searchParams);
    params.set("amount", amountString);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col p-3 gap-3 pb-0">
      <h3 className="">Amount to be given</h3>
      <input
        name="amount"
        type="text"
        placeholder="Enter the amount"
        value={donationAmount ? `$${donationAmount}` : 0}
        defaultValue={searchParams.get("amount"?.toString()) || ""}
        onChange={handleInputChange}
        className="bg-[#F5F8FA] p-3 w-full rounded-full pl-[2rem] placeholder:font-normal outline-none"
        id="donationAmount"
      />

      {/* Buttons Group */}
      <div className="flex items-center justify-between">
        <button
          className={`${donationAmount === 10 ? "btn-active" : "btn"}`}
          onClick={() => handleButtonClick(10)}>
          $10
        </button>
        <button
          className={`btn ${donationAmount === 25 ? "btn-active" : "btn"}`}
          onClick={() => handleButtonClick(25)}>
          $25
        </button>
        <button
          className={`btn ${donationAmount === 50 ? "btn-active" : "btn"}`}
          onClick={() => handleButtonClick(50)}>
          $50
        </button>
        <button
          className={`btn ${donationAmount === 100 ? "btn-active" : "btn"}`}
          onClick={() => handleButtonClick(100)}>
          $100
        </button>
      </div>

      <div className="flex items-center justify-center p-[1rem]">
        <Link
          className={`btn ${
            donationAmount ? "btn-primary-active" : "btn-primary"
          }`}
          href={"/details"}>
          Donate Now
          <svg
            width="43"
            height="43"
            viewBox="0 0 43 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-[#FFFFFF38] rounded-full">
            <path
              d="M17.3329 13.0373C17.5008 12.8693 17.7306 12.7633 17.9958 12.7633L28.7261 12.7633C29.2388 12.7633 29.6631 13.1875 29.6631 13.7002L29.6631 24.4305C29.6631 24.9432 29.2388 25.3675 28.7261 25.3675C28.2135 25.3675 27.7892 24.9432 27.7892 24.4305L27.7892 14.6371L17.9958 14.6371C17.4831 14.6371 17.0589 14.2128 17.0589 13.7002C17.05 13.4439 17.1649 13.2052 17.3329 13.0373Z"
              fill="white"
            />
            <path
              d="M13.0372 28.0633L27.913 13.1876C28.2754 12.8252 28.8764 12.8252 29.2388 13.1876C29.6012 13.5499 29.6012 14.151 29.2388 14.5134L14.3631 29.3891C14.0007 29.7515 13.3996 29.7515 13.0372 29.3891C12.6748 29.0267 12.6748 28.4257 13.0372 28.0633Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Page;

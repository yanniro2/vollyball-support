"use client";
import React, { useState } from "react";
import Image from "next/image";

const Popup: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const handleButtonClick = (amount: number) => {
    setDonationAmount(amount);
  };

  return (
    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center">
      <div className="w-3/5 h-min bg-white rounded-xl drop-shadow p-3 flex flex-col gap-5">
        {/* Banner */}
        <div className="bg-[#242424] rounded-xl relative">
          <Image
            src="/banner.png"
            alt="img banner"
            width={800}
            height={100}
            className="w-full h-full object-fill"
          />
          <h1 className="absolute top-1/2 left-1/2 text-[60px]  font-bebas -translate-y-1/2 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            Support The Team
          </h1>
        </div>

        {/* Process */}
        <div className="bg-[#F5F8FA] rounded-full p-3 px-[2rem] flex items-center justify-between">
          {/* Step-1 */}
          <div
            className={`flex items-center gap-3 ${
              donationAmount === 10 ? "active" : ""
            }`}>
            <div
              className="w-[2rem] h-[2rem] bg-[#EF0325] flex items-center justify-center text-white rounded-full"
              onClick={() => handleButtonClick(10)}>
              1
            </div>
            <h3 className="capitalize font-semibold">amount</h3>
            <svg
              width="6"
              height="12"
              viewBox="0 0 6 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-[5rem]">
              <path
                d="M1 1L4.58579 4.58579C5.36684 5.36684 5.36683 6.63317 4.58579 7.41421L1 11"
                stroke="black"
                stroke-linecap="round"
              />
            </svg>
          </div>

          {/* Step-2 */}
          <div
            className={`flex items-center gap-3 ${
              donationAmount === 25 ? "active" : ""
            }`}>
            <div
              className="w-[2rem] h-[2rem] bg-[#E1E1E6] flex items-center justify-center rounded-full text-[#6B7578]"
              onClick={() => handleButtonClick(25)}>
              2
            </div>
            <h3 className="capitalize text-[#6B7578]">Details</h3>
            <svg
              width="6"
              height="12"
              viewBox="0 0 6 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-[5rem]">
              <path
                d="M1 1L4.58579 4.58579C5.36684 5.36684 5.36683 6.63317 4.58579 7.41421L1 11"
                stroke="black"
                stroke-linecap="round"
              />
            </svg>
          </div>

          {/* Step-3 */}
          <div
            className={`flex items-center gap-3 ${
              donationAmount === 50 ? "active" : ""
            }`}>
            <div
              className="w-[2rem] h-[2rem] bg-[#E1E1E6] flex items-center justify-center rounded-full text-[#6B7578]"
              onClick={() => handleButtonClick(50)}>
              3
            </div>
            <h3 className="capitalize text-[#6B7578]">Payment</h3>
          </div>
        </div>

        {/* Amount Selected */}
        <div className="flex flex-col p-3 gap-3 pb-0">
          <h3 className="">Amount to be given</h3>
          <input
            type="text"
            placeholder="Enter the amount"
            value={`$${donationAmount ? donationAmount : 0}`}
            onChange={(e) => setDonationAmount(parseFloat(e.target.value))}
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
            <button
              className={`btn ${
                donationAmount ? "btn-primary-active" : "btn-primary"
              }`}>
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
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popup;

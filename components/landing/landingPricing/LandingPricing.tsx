"use client";

import { pricingPlans } from "@/constants/landing/pricingCards";
import { useInViewCustom } from "@/hooks/inView/useInViewCustom";
import { Check } from "lucide-react";
import { useState } from "react";

const LandingPricing = () => {
  const [pricingSelected, setPricingSelected] = useState<number>(1);
  const { ref, inView } = useInViewCustom();

  return (
    <div
      ref={ref}
      className={`flex flex-col w-full space-y-4 items-center mt-30 ${
        inView && "slide-in-left"
      }`}
    >
      <h2 className="text-black font-semibold text-3xl text-center">
        Simple Pricing, built for everyone.
      </h2>

      <p className="text-base text-gray-700 max-w-[700px] text-center px-6">
        Choose the plan that&apos;s right for you and unlock your productivity
        potential.
      </p>

      <div className="flex flex-wrap gap-6 px-6 mt-8 items-center justify-center">
        {pricingPlans.map((item, index) => {
          const selected = pricingSelected === index;

          return (
            <div
              onClick={() => setPricingSelected(index)}
              key={item.plan}
              className={`${
                selected
                  ? "border-2 border-purple-600 shadow-purple-300 shadow-2xl scale-105"
                  : "shadow-xl"
              }  w-[320px] md:w-[350px] h-[400px] bg-[#eee]  rounded-2xl flex flex-col space-y-6 p-6 transition-all duration-500 cursor-pointer`}
            >
              <div className="flex flex-col space-y-0.5">
                <div className="flex items-center justify-between">
                  <strong className="text-base fontm-semibold text-black">
                    {item.plan}
                  </strong>
                  {item.badge && (
                    <span className="rounded-full px-3 py-0.5 text-white font-bold text-[10px] bg-purple-600">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm mt-2 text-gray-600">{item.description}</p>
              </div>
              <div className="flex items-end">
                <strong className="font-extrabold text-black text-4xl">
                  ${item.price}
                </strong>
                <span className="text-gray-600 font-light">/Mo</span>
              </div>

              <button
                className={`mx-auto w-full py-2 flex justify-center items-center rounded-full cursor-pointer ${
                  selected
                    ? "bg-purple-600 text-white font-semibold"
                    : "bg-gray-300/50"
                }`}
              >
                {item.buttonText}
              </button>

              <ul className="flex flex-col space-y-3">
                {item.features.map((feature) => (
                  <li className="flex space-x-2" key={feature}>
                    <div className="flex items-center justify-center w-4 h-4 rounded-full bg-purple-600">
                      <Check className="text-white size-2.5" />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPricing;

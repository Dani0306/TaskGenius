"use client";

import { featuresCard } from "@/constants/landing/featuresCard";
import { useInViewCustom } from "@/hooks/inView/useInViewCustom";
import { getAnimationDelay } from "@/lib/utils";

const LandingCards = () => {
  const { ref, inView } = useInViewCustom();

  return (
    <div
      ref={ref}
      className="flex flex-col space-y-3 items-center mt-34 mb-8 px-6"
    >
      <div
        className={`${
          inView && "slide-in-left"
        } flex flex-col space-y-4 items-center`}
      >
        <span className="font-medium text-purple-700">Why TaskGenius?</span>

        <h2 className="text-black font-semibold text-3xl text-center">
          Everything you need, powered by AI
        </h2>

        <p className="text-base text-gray-700 max-w-[700px] text-center px-6">
          Our platform is designed to be both intuitive and powerful, enabling
          you and your team to focus on what matters most.
        </p>
      </div>

      <div className="flex px-4 mx-auto flex-wrap gap-6 mt-16 items-center justify-center">
        {featuresCard.map((item, index) => (
          <div
            key={item.title}
            className={`${getAnimationDelay(
              index,
              inView
            )} w-[290px] h-[230px] rounded-lg bg-[#eee] shadow-lg flex flex-col space-y-3 p-5 opacity-0`}
          >
            <div className="p-3 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-purple-600/10">
              <item.icon className="text-purple-600" />
            </div>
            <strong className="font-medium text-black text-xl">
              {item.title}
            </strong>
            <p className="text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingCards;

"use client";

import { useInViewCustom } from "@/hooks/inView/useInViewCustom";
import Image from "next/image";

const LandingImage = () => {
  const { ref, inView } = useInViewCustom();

  return (
    <section
      ref={ref}
      className={`${
        inView && "slide-in-right"
      } flex flex-col w-full space-y-4 items-center my-30`}
    >
      <h2 className="text-black font-semibold text-3xl">
        A Glimpse into TaskGenius
      </h2>

      <p className="text-base text-gray-700 max-w-[700px] text-center px-6">
        Explore the clean and intuitive interface that makes productivity
        effortless.
      </p>
      <div className="w-[90%] rounded-lg h-[300px] md:h-[600px] lg:max-w-[1000px] relative mx-auto mt-8">
        <Image
          src={"/pageView.png"}
          fill
          objectFit="contain"
          alt="App preview"
        />
      </div>
    </section>
  );
};

export default LandingImage;

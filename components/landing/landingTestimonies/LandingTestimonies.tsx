"use client";

import { testimonials } from "@/constants/landing/testimonyCards";
import { useInViewCustom } from "@/hooks/inView/useInViewCustom";
import { calculateStarFillPercentages } from "@/lib/utils";
import Image from "next/image";

const LandingTestimonies = () => {
  const { ref, inView } = useInViewCustom();
  return (
    <div
      ref={ref}
      className={`${
        inView && "slide-up"
      } flex flex-col space-y-4 w-full items-center p-6`}
    >
      <h2 className="text-black font-semibold text-3xl">What our users say.</h2>
      <p className="text-base text-gray-700 max-w-[700px] text-center px-6">
        Discover how our users have experienced the platform firsthand.
      </p>

      <div className="flex flex-wrap gap-6 px-6 mt-6 items-center justify-center">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="bg-[#eee] rounded-xl flex flex-col w-[350px] h-[300px] p-6 space-y-5 shadow-xl"
          >
            <div className="flex space-x-3 items-center">
              <div className="w-[60px] h-[60px] relative">
                <Image
                  fill
                  src={item.image}
                  alt="Customer image"
                  className=" rounded-full"
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <strong className="text-black font-medium">{item.name}</strong>
                <p className="text-gray-600 text-sm">{item.role}</p>
              </div>
            </div>
            <div className="flex space-x-0.5">
              {calculateStarFillPercentages(item.rating).map(
                (rating, index) => (
                  <div key={index}>
                    {rating === 100 ? (
                      <div className="relative w-5 h-5">
                        <Image
                          src={"/ratingStar.png"}
                          fill
                          objectFit="cover"
                          alt="Rating star"
                        />
                      </div>
                    ) : (
                      <div className="relative w-5 h-5">
                        <Image
                          src={"/noStar.png"}
                          fill
                          objectFit="cover"
                          alt="Rating star"
                        />
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
            <p className="text-gray-600">{item.testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingTestimonies;

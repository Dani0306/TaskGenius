import React from "react";

const LandingNavItems = () => {
  return (
    <ul className="hidden md:flex items-center space-x-5 text-sm text-gray-800">
      <li className="cursor-pointer hover:scale-[1.05] transition-all duration-500">
        Features
      </li>
      <li className="cursor-pointer hover:scale-[1.05] transition-all duration-500">
        Showcase
      </li>
      <li className="cursor-pointer hover:scale-[1.05] transition-all duration-500">
        Pricing
      </li>
      <li className="cursor-pointer hover:scale-[1.05] transition-all duration-500">
        Testimonials
      </li>
    </ul>
  );
};

export default LandingNavItems;

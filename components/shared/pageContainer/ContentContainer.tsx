import React from "react";

const ContentContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col py-6 px-6 md:px-10">
      {children}
    </div>
  );
};

export default ContentContainer;

import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col min-h-screen bg-(image:--tg-gradient-glow) overflow-auto">
      {children}
    </div>
  );
};

export default PageContainer;

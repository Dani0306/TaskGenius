import React from "react";

const PageHeader = ({
  title,
  subtitle,
  actionContent,
}: {
  title: string;
  subtitle?: string;
  actionContent?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
      <div className="flex flex-col space-y-1">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      {actionContent}
    </div>
  );
};

export default PageHeader;

import { OctagonX, RotateCcw } from "lucide-react";
import React from "react";
import PageButton from "../PageButton";

const ErrorScreen = ({
  message,
  error,
}: {
  message?: string;
  error: Error;
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-7">
      <OctagonX className="size-20 lg:size-26 p-5 bg-primary/20 text-primary rounded-full" />
      <div className="items-center justify-center flex flex-col space-y-2">
        <h2 className="text-3xl font-bold text-black lg:text-4xl">
          Something went wrong!
        </h2>
        <p className="text-center px-6 text-gray-600">
          {message
            ? error.message || message
            : "We couldn't load the content you were looking for. Please tryagain."}
        </p>
      </div>
      <PageButton text="Try again" logo={RotateCcw} />
    </div>
  );
};

export default ErrorScreen;

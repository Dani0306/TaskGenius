import React from "react";

const DeleteButton = ({
  onClick,
  disabled,
  text,
}: {
  onClick: () => void;
  disabled?: boolean;
  text: string;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="cursor-pointer mx-auto w-full bg-red-600 text-white font-medium rounded-xl py-2 mt-6 disabled:opacity-40 hover:bg-red-600/70 transition-all duration-300"
    >
      {text}
    </button>
  );
};

export default DeleteButton;

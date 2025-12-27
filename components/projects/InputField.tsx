import React from "react";

type InputFieldProps = {
  label?: string;
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  textArea?: boolean;
  type: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  size?: "lg" | "sm";
};

const InputField = ({
  label,
  name,
  type = "text",
  value,
  setValue,
  placeholder,
  textArea,
  ref,
  size = "lg",
}: InputFieldProps) => {
  return (
    <div className="flex flex-col space-y-2 w-full mx-auto">
      {label && (
        <label className="font-medium text-sm" htmlFor={name}>
          {label}
        </label>
      )}

      {textArea ? (
        <textarea
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={name}
          className="w-full py-2 px-3 rounded-xl text-sm lg:text-base bg-white border border-gray-300 outline-none"
          placeholder={placeholder}
          rows={3}
        ></textarea>
      ) : (
        <input
          ref={ref}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type={type}
          name={name}
          className={`w-full py-2 px-3 rounded-xl  bg-white border border-gray-300 outline-none ${
            size === "sm" ? "text-sm" : "text-base"
          }`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputField;

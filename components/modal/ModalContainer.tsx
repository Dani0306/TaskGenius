import { useModal } from "@/providers/context/AppModalProvider";
import { X } from "lucide-react";
import React from "react";

type ModalProps = {
  size?: "lg" | "md" | "sm" | "xs";
  children: React.ReactNode;
};

const ModalContainer = ({ size = "md", children }: ModalProps) => {
  const { closeModal } = useModal();

  return (
    <div
      className={`w-full h-screen relative overflow-hidden no-scrollbar shadow-xl ${
        size === "lg"
          ? "md:w-[800px] lg:w-[1100px] md:h-[700px]"
          : size === "md"
          ? "md:w-[650px] md:h-[600px]"
          : size === "sm"
          ? "md:w-[450px] md:h-[550px]"
          : "md:w-[400px] md:h-[450px]"
      } glassmorphism rounded-2xl`}
    >
      <X
        onClick={closeModal}
        className="cursor-pointer text-black size-5 sticky top-4 left-4"
      />
      {children}
    </div>
  );
};

export default ModalContainer;

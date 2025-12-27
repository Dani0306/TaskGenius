import { LucideIcon } from "lucide-react";

const PageButton = ({
  text,
  logo: Logo,
  onClick,
  light = false,
}: {
  text: string;
  logo?: LucideIcon;
  onClick?: () => void;
  light?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer py-1.5 md:py-2 px-5 md:px-6 font-medium rounded-full text-sm flex space-x-3 items-center transition-colors duration-300
        ${
          light
            ? "bg-white text-black hover:bg-neutral-100"
            : "text-white bg-linear-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg shadow-primary/30 transition-all disabled:opacity-40"
        }
      `}
    >
      {Logo && <Logo className="size-4" />}
      <span>{text}</span>
    </button>
  );
};

export default PageButton;

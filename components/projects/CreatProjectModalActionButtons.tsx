import { LucideIcon } from "lucide-react";

const CreatProjectModalActionButtons = ({
  handleCancelClick,
  handleConfirmClick,
  confirmText,
  cancelText,
  disabled = false,
  icon: Icon,
}: {
  handleCancelClick: () => void;
  handleConfirmClick: () => void;
  confirmText: string;
  cancelText: string;
  disabled?: boolean;
  icon?: LucideIcon;
}) => {
  return (
    <div className="space-x-4 mx-auto w-full flex justify-end mt-6 mb-10">
      <button
        onClick={handleCancelClick}
        className="cursor-pointer flex items-center justify-center rounded-lg h-9 px-6 text-base font-semibold text-gray-700 bg-gray-300 transition-colors hover:bg-gray-400/50"
        type="button"
      >
        {cancelText}
      </button>
      <button
        disabled={disabled}
        onClick={handleConfirmClick}
        className="cursor-pointer space-x-3 flex items-center justify-center rounded-lg h-9 px-8 text-base font-semibold text-white bg-linear-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg shadow-primary/30 transition-all disabled:opacity-40"
        type="button"
      >
        <span>{confirmText}</span>
        {Icon && <Icon className="size-4 text-white" />}
      </button>
    </div>
  );
};

export default CreatProjectModalActionButtons;

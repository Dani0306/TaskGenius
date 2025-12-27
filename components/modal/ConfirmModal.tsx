import ModalContainer from "./ModalContainer";
import { Trash2 } from "lucide-react";
import { useModal } from "@/providers/context/AppModalProvider";

const ConfirmModal = ({
  message,
  fn,
}: {
  message?: string;
  fn: () => void;
}) => {
  const { closeModal } = useModal();

  const onConfirm = () => {
    fn();
    closeModal();
  };

  return (
    <ModalContainer size="xs">
      <div className="flex w-full h-full mt-[-30px] flex-col items-center justify-center px-6 space-y-3">
        <Trash2 className="size-12 p-3 bg-primary/10 text-red-600 rounded-full" />
        <strong>Are you sure?</strong>
        <p className="text-center text-sm text-gray-600">
          {message ??
            "This will permanently delete the selected item. This action can not be undone."}
        </p>

        <div className="flex space-x-3 items-center mt-4">
          <button
            onClick={closeModal}
            className="cursor-pointer bg-white py-1.5 px-12 font-medium text-black text-sm rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer bg-red-600 py-1.5 px-12 font-medium text-white text-sm rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;

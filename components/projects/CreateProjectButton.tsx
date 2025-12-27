"use client";

import { useModal } from "@/providers/context/AppModalProvider";
import { Plus } from "lucide-react";
import ModalContainer from "../modal/ModalContainer";
import CreateProjectModal from "./CreateProjectModal";

const CreateProjectButton = () => {
  const { openModal } = useModal();

  return (
    <button
      onClick={() =>
        openModal(
          <ModalContainer size="lg">
            <CreateProjectModal />
          </ModalContainer>
        )
      }
      className="cursor-pointer flex items-center justify-center bg-primary rounded-full h-14 w-14 lg:w-16 lg:h-16 text-white fixed bottom-10 right-6"
    >
      <Plus className="size-6 lg:size-7" />
    </button>
  );
};

export default CreateProjectButton;

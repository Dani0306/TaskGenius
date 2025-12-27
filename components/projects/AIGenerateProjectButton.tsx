"use client";

import { useModal } from "@/providers/context/AppModalProvider";
import { WandSparkles } from "lucide-react";
import ModalContainer from "../modal/ModalContainer";
import ChooseView from "./ChooseView";
import PageButton from "../shared/PageButton";

const AIGenerateProjectButton = () => {
  const { openModal } = useModal();

  return (
    <PageButton
      text="Build Alongside AI"
      logo={WandSparkles}
      onClick={() =>
        openModal(
          <ModalContainer size="lg">
            <ChooseView />
          </ModalContainer>
        )
      }
    />
  );
};

export default AIGenerateProjectButton;

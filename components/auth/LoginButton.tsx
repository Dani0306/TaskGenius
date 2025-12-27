import { useModal } from "@/providers/context/AppModalProvider";
import PageButton from "../shared/PageButton";
import { LogIn } from "lucide-react";
import ModalContainer from "../modal/ModalContainer";
import LoginModal from "./LoginModal";

const LoginButton = () => {
  const { openModal } = useModal();

  return (
    <PageButton
      onClick={() =>
        openModal(
          <ModalContainer size="sm">
            <LoginModal />
          </ModalContainer>
        )
      }
      logo={LogIn}
      text="Login"
    />
  );
};

export default LoginButton;

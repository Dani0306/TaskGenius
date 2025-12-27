"use client";

import LoginModal from "@/components/auth/LoginModal";
import ModalContainer from "@/components/modal/ModalContainer";
import PageButton from "@/components/shared/PageButton";
import { useInViewCustom } from "@/hooks/inView/useInViewCustom";
import { useModal } from "@/providers/context/AppModalProvider";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const LandingHero = ({ user }: { user: User | null }) => {
  const router = useRouter();
  const { ref, inView } = useInViewCustom();
  const { openModal } = useModal();

  return (
    <section
      ref={ref}
      className={`${
        inView && "slide-in-right"
      } flex flex-col mt-34 space-y-10 items-center`}
    >
      <h1 className="text-black font-extrabold text-4xl md:text-5xl text-center">
        Think Less. <br /> Achieve More. <br />
      </h1>
      <p className="text-gray-600 text-base text-center px-8 lg:px-0">
        Automate your workflow, manage projects, and gain smart insights to
        achieve <br /> your goals faster. The future of productivity is here.
      </p>

      <div className="flex space-x-4">
        <PageButton
          onClick={() =>
            user
              ? router.push("/app/dashboard")
              : openModal(
                  <ModalContainer size="sm">
                    <LoginModal />
                  </ModalContainer>
                )
          }
          text="Get Started"
        />
        <PageButton light text="Watch Demo" />
      </div>
    </section>
  );
};

export default LandingHero;

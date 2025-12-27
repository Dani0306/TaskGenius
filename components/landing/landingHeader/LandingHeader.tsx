"use client";

import AppLogoLanding from "@/components/shared/AppLogoLanding";

import LandingNavItems from "./LandingNavItems";
import LoginButton from "@/components/auth/LoginButton";
import { useInViewCustom } from "@/hooks/inView/useInViewCustom";
import { User } from "@supabase/supabase-js";

const LandingHeader = ({ user }: { user: User | null }) => {
  const { ref, inView } = useInViewCustom();

  return (
    <header
      ref={ref}
      className={`${inView && "fade-in"} w-full h-[15vh] lg:h-[12vh] opacity-0`}
    >
      <nav className="mx-auto h-full max-w-[1700px] flex items-center justify-between px-6 lg:px-10">
        <AppLogoLanding size="lg" />
        <LandingNavItems />
        {!user ? <LoginButton /> : <></>}
      </nav>
    </header>
  );
};

export default LandingHeader;

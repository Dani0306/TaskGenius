"use client";

import { createBrowserSupabase } from "@/utils/supabase/client";
import AppLogoLanding from "../shared/AppLogoLanding";
import SignInWithProviderButton from "./SignInWithProvider";

const LoginModal = () => {
  const supabase = createBrowserSupabase();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) console.error(error);
  };

  return (
    <div className="flex flex-col space-y-2 p-6 items-center pt-12">
      <AppLogoLanding size="sm" />
      <div className="mt-4 flex flex-col items-center">
        <h2 className="font-semibold text-3xl text-black">Welcome Back</h2>
        <p className="text-sm">Sign in to continue working smarter.</p>
      </div>
      <div className="w-[90%] flex flex-col items-center space-y-4 mt-10">
        <SignInWithProviderButton
          onClick={handleSignIn}
          provider="Google"
          src="/google.png"
        />
        <SignInWithProviderButton provider="GitHub" src="/github.webp" />
        <SignInWithProviderButton provider="Apple" src="/apple.svg" />
      </div>
      <div className="mt-8 flex space-x-2">
        <span className="text-xs text-gray-600">
          Don&apos;t have an account?
        </span>
        <span className="text-xs font-medium text-purple-600">Sign Up</span>
      </div>
    </div>
  );
};

export default LoginModal;

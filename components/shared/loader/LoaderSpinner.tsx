"use client";

import { Sparkles } from "lucide-react";

export default function LoaderSpinner({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
      {/* Spinner + glow */}
      <div className="relative h-14 w-14">
        {/* Soft glow */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.55),transparent_70%)] blur-xl" />

        {/* Outer gradient ring */}
        <div className="relative flex items-center justify-center h-full w-full rounded-full bg-[radial-gradient(circle_at_top,#a855f7,#6366f1)]">
          {/* Spinning border */}
          <div className="absolute inset-1 rounded-full border-[3px] border-transparent border-t-[#f5f3ff] border-r-[#c4b5fd] animate-spin" />
          {/* Inner circle */}
          <div className="h-7 w-7 rounded-full bg-[#f5f3ff]" />
        </div>
      </div>

      {/* Text */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-primary">
          {message ? message : "Loading ..."}
        </span>
        <Sparkles className="h-4 w-4 text-primary animate-[pulse_1.4s_ease-in-out_infinite]" />
      </div>

      <p className="text-xs text-slate-500">
        We&apos;re getting everything ready for you.
      </p>
    </div>
  );
}

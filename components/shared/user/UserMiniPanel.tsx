"use client";

import { useEffect, useRef } from "react";
import type { User } from "@supabase/supabase-js";
import {
  LogOut,
  Moon,
  Sun,
  Shield,
  User as UserIcon,
  Settings,
} from "lucide-react";
import type { Plan } from "@/types";
import UserCard from "./UserCard";

type UserProfilePanelProps = {
  user: User; // Supabase user
  plan?: Plan; // "starter" | "pro" | "team"
  status?: "active" | "paused";
  isDarkMode?: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;

  onProfile?: () => void;
  onSecurity?: () => void;
  onSettings?: () => void;
  onToggleTheme?: () => void;
  onLogout?: () => void;
};
export default function UserMiniPanel({
  user,
  isDarkMode = false,
  isOpen,
  setIsOpen,
  onProfile,
  onSecurity,
  onSettings,
  onToggleTheme,
  onLogout,
}: UserProfilePanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  // If not open, render nothing
  if (!isOpen) return null;

  // Supabase metadata

  return (
    <div
      ref={panelRef}
      className="
        w-[320px]
        rounded-3xl border border-[#e4ddff]
        bg-[rgba(248,245,255,0.95)]
        shadow-[0_18px_45px_rgba(88,28,135,0.18)]
        backdrop-blur-xl
        p-4
        text-sm
        flex flex-col
        space-y-4
      "
    >
      {/* Header */}
      <div className="flex items-center space-x-3">
        <UserCard user={user} />
      </div>

      <div className="h-px bg-linear-to-r from-transparent via-[#e5defe] to-transparent" />

      {/* Links */}
      <div className="flex flex-col space-y-1">
        <button
          onClick={onProfile}
          className="flex items-center gap-2 px-2 py-2 rounded-xl hover:bg-[#f1ecff] text-slate-800"
        >
          <UserIcon className="w-4 h-4 text-[#7c3aed]" />
          <span className="text-xs font-medium">Profile</span>
        </button>

        <button
          onClick={onSecurity}
          className="flex items-center gap-2 px-2 py-2 rounded-xl hover:bg-[#f1ecff] text-slate-800"
        >
          <Shield className="w-4 h-4 text-[#7c3aed]" />
          <span className="text-xs font-medium">Security</span>
        </button>

        <button
          onClick={onSettings}
          className="flex items-center gap-2 px-2 py-2 rounded-xl hover:bg-[#f1ecff] text-slate-800"
        >
          <Settings className="w-4 h-4 text-[#7c3aed]" />
          <span className="text-xs font-medium">Settings</span>
        </button>
      </div>

      <div className="h-px from-transparent via-[#e5defe] to-transparent" />

      {/* Dark mode toggle */}
      <div className="flex items-center justify-between px-2 py-2 rounded-2xl bg-white/70 border border-[#e4ddff]">
        <span className="text-xs font-medium text-slate-800">Dark Mode</span>
        <button
          onClick={onToggleTheme}
          className={`
            flex items-center gap-1 px-3 py-1 rounded-full text-[11px] border
            ${
              isDarkMode
                ? "bg-[#1e1635] text-white border-[#4c1d95]"
                : "bg-[#f5f3ff] text-slate-700 border-[#e4ddff]"
            }
          `}
        >
          {isDarkMode ? (
            <>
              <Moon className="w-3 h-3" />
              On
            </>
          ) : (
            <>
              <Sun className="w-3 h-3" />
              Off
            </>
          )}
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="
        cursor-pointer
          mt-1 w-full flex items-center justify-center gap-2
          rounded-2xl
          bg-[#fef2f2]
          text-[#b91c1c]
          text-xs font-semibold
          py-2.5
          border border-[#fecaca]
          hover:bg-[#fee2e2]
          transition-colors
        "
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}

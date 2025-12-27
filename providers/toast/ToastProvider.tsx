"use client";

type ToastType = "success" | "warning" | "error";

import { Check, TriangleAlert, X } from "lucide-react";
import React, { useContext, createContext, useState } from "react";

type contextType = {
  toast: ({
    title,
    description,
    type,
    duration,
  }: {
    title: string;
    description?: string;
    type: ToastType;
    duration?: number;
  }) => void;
};

const Ctx = createContext<contextType | undefined>(undefined);

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastTitle, setToastTitle] = useState<string>("");
  const [toastDescription, setToastDescription] = useState<string>("");
  const [toastType, setToastType] = useState<ToastType>("success");

  const toast = ({
    title,
    description,
    type,
    duration = 4000,
  }: {
    title: string;
    description?: string;
    type: ToastType;
    duration?: number;
  }) => {
    setShowToast(true);
    setToastTitle(title);
    setToastDescription(description ?? "");
    setToastType(type);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  const value = { toast };

  return (
    <Ctx.Provider value={value}>
      {children}
      <div
        className={`fixed w-[350px] right-4 transition-all duration-500 bg-white rounded-xl
      ${!showToast ? "bottom-[-400px]" : "bottom-6"}
        `}
      >
        <Toast
          type={toastType}
          title={toastTitle}
          description={toastDescription}
        />
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);

  if (!ctx)
    throw new Error(
      "You must be within the toast provider in order to access this function."
    );

  return ctx;
}

function Toast({
  type = "success",
  title,
  description,
}: {
  type: ToastType;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative p-4 overflow-hidden rounded-xl shadow-xl">
      <div className="absolute inset-0 opacity-40 dark:opacity-30 bg-linear-to-br from-primary/50 via-primary/20 to-transparent"></div>

      <div className="relative flex items-center">
        <div className="shrink-0">
          {/* Success Icon Container */}
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/30">
            {/* Glowing Effect */}
            {type === "success" ? (
              <Check className="size-5.5 text-primary" />
            ) : type === "error" ? (
              <X className="size-5.5 text-primary" />
            ) : (
              <TriangleAlert className="size-5.5 text-primary" />
            )}
            <div className="absolute inset-0 rounded-full bg-primary opacity-50 blur-lg"></div>
          </div>
        </div>

        <div className="flex-1 w-0 ml-4">
          <p className="font-semibold text-sm text-gray-900 dark:text-white">
            {title}
          </p>
          {description && (
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

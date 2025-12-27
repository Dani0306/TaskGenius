"use client";

import { useContext, createContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ContextType = {
  openModal: (node: React.ReactNode) => void;
  closeModal: () => void;
};

const Ctx = createContext<ContextType | undefined>(undefined);

export default function AppModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [node, setNode] = useState<React.ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // * Open modal fn

  const openModal = (node: React.ReactNode) => {
    setIsOpen(true);
    setNode(node);
  };

  // * Close modal fn

  const closeModal = () => {
    setIsOpen(false);
    setNode(null);
  };

  // * Instancing the context value

  const value: ContextType = {
    openModal,
    closeModal,
  };

  // * Closing the modal whenever ESC is pressed

  useEffect(() => {
    if (!isOpen) return;
    const fn = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", fn);

    return () => window.removeEventListener("keydown", fn);
  }, [isOpen]);

  // * Preventing the page from scrolling whenever the modal is active

  useEffect(() => {
    if (!isOpen) return;

    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <Ctx.Provider value={value}>
      {children}

      {isOpen &&
        createPortal(
          <BackDrop onClose={closeModal}>{node}</BackDrop>,
          document.body
        )}
    </Ctx.Provider>
  );
}

export const useModal = () => {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error(
      "To call this context you must use this component with the Context provider."
    );

  return ctx;
};

function BackDrop({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [interactive, seInteractive] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => seInteractive(true), 120);
    return () => clearTimeout(timer);
  }, []);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onMouseDown={onBackdropClick}
      className={`
    fixed inset-0 z-99999
    flex items-center justify-center

    bg-[rgba(225,220,248,0.65)]
    backdrop-blur-xl

    before:content-['']
    before:absolute before:inset-0
    before:bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.8),transparent_70%)]

    ${interactive ? "pointer-events-auto" : "pointer-events-none"}
  `}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import AppModalProvider from "@/providers/context/AppModalProvider";
import ToastProvider from "@/providers/toast/ToastProvider";

export const metadata: Metadata = {
  title: "TaskGenius AI",
  description:
    "TaskGenius AI is an intelligent productivity app designed to organize projects, streamline workflows, and help you achieve more with less effort. Manage tasks, priorities, timelines, and receive AI‑powered recommendations to work faster, clearer, and more efficiently.",
};

const outfit = localFont({
  src: [
    {
      path: "../fonts/Outfit-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Outfit-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Outfit-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Outfit-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Outfit-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Outfit-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Outfit-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Outfit-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Outfit-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-outfit",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased relative`}>
        <ToastProvider>
          <AppModalProvider>{children}</AppModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

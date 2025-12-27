"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { User } from "@supabase/supabase-js";
import AppLogoLanding from "./shared/AppLogoLanding";
import { navItems } from "@/constants/navItems";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import UserCard from "./shared/user/UserCard";
import UserMiniPanel from "./shared/user/UserMiniPanel";
import { useState } from "react";
import { createBrowserSupabase } from "@/utils/supabase/client";

export function AppSidebar({ user }: { user: User | null }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const supabase = createBrowserSupabase();
  const router = useRouter();

  const handleLogout = () => {
    supabase.auth.signOut();
    router.push("/");
  };

  return (
    <Sidebar className="z-[200] w-[265px] p-3 bg-white">
      <SidebarHeader className="bg-white">
        <AppLogoLanding size="lg" />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <ul className="flex flex-col mt-6 space-y-3">
          {navItems.map((item) => {
            const active =
              pathname.includes(item.href) || pathname.includes(item.key);

            return (
              <li key={item.href} className="px-4 lg:px-2">
                <Link
                  className={`flex items-center space-x-3 py-1.5 px-3 cursor-pointer text-sm lg:text-base ${
                    active
                      ? "bg-primary/10 border border-primary text-primary"
                      : "text-gray-700"
                  } rounded-full`}
                  href={item.href}
                >
                  <item.icon className="size-4.5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </SidebarContent>
      <SidebarFooter className="bg-white flex flex-col space-y-3">
        <UserCard user={user} onClick={() => setIsOpen(true)} />
        <div className="absolute bottom-4 left-4">
          <UserMiniPanel
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            user={user!}
            plan="starter"
            isDarkMode={false}
            onProfile={() => console.log("Go to profile")}
            onSettings={() => console.log("Go to settings")}
            onLogout={handleLogout}
            onToggleTheme={() => console.log("Toggle theme")}
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

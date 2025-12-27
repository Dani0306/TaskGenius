import {
  ClipboardCheck,
  FolderKanban,
  LayoutDashboard,
  LucideIcon,
  Ruler,
  Settings,
} from "lucide-react";

export const navItems: Array<{
  label: string;
  href: string;
  icon: LucideIcon;
  key: string;
}> = [
  {
    label: "Dashboard",
    href: "/app/dashboard",
    icon: LayoutDashboard,
    key: "dashboard",
  },
  {
    label: "My projects",
    href: "/app/projects?status=active",
    icon: FolderKanban,
    key: "projects",
  },
  {
    label: "My Tasks",
    href: "/app/tasks",
    icon: ClipboardCheck,
    key: "tasks",
  },
  {
    label: "Analytics",
    href: "/app/analytics",
    key: "analytics",
    icon: Ruler,
  },
  {
    label: "Settings",
    href: "/app/settings",
    icon: Settings,
    key: "settings",
  },
];

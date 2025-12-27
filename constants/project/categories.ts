import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Brush,
  Dumbbell,
  HeartPulse,
  BookOpen,
  PiggyBank,
  TrendingUp,
  CalendarCheck,
  Plane,
  Home,
  Building2,
  PencilLine,
  Video,
  LucideIcon,
} from "lucide-react";

import type { ProjectCategory } from "@/types";

export const CATEGORY_META: Record<
  ProjectCategory,
  { label: string; text: string; bg: string; icon: LucideIcon }
> = {
  personal: {
    label: "Personal",
    text: "text-purple-600",
    bg: "bg-purple-600/20",
    icon: User,
  },
  work: {
    label: "Work",
    text: "text-blue-600",
    bg: "bg-blue-600/20",
    icon: Briefcase,
  },
  school: {
    label: "School",
    text: "text-indigo-600",
    bg: "bg-indigo-600/20",
    icon: GraduationCap,
  },
  software_development: {
    label: "Software",
    text: "text-violet-600",
    bg: "bg-violet-600/20",
    icon: Code,
  },
  design: {
    label: "Design",
    text: "text-pink-600",
    bg: "bg-pink-600/20",
    icon: Brush,
  },
  fitness: {
    label: "Fitness",
    text: "text-green-600",
    bg: "bg-green-600/20",
    icon: Dumbbell,
  },
  health: {
    label: "Health",
    text: "text-red-600",
    bg: "bg-red-600/20",
    icon: HeartPulse,
  },
  learning: {
    label: "Learning",
    text: "text-emerald-600",
    bg: "bg-emerald-600/20",
    icon: BookOpen,
  },
  finance: {
    label: "Finance",
    text: "text-amber-600",
    bg: "bg-amber-600/20",
    icon: PiggyBank,
  },
  career: {
    label: "Career",
    text: "text-sky-600",
    bg: "bg-sky-600/20",
    icon: TrendingUp,
  },
  daily_routine: {
    label: "Routine",
    text: "text-violet-500",
    bg: "bg-violet-500/20",
    icon: CalendarCheck,
  },
  travel: {
    label: "Travel",
    text: "text-orange-600",
    bg: "bg-orange-600/20",
    icon: Plane,
  },
  home: {
    label: "Home",
    text: "text-teal-600",
    bg: "bg-teal-600/20",
    icon: Home,
  },
  business: {
    label: "Business",
    text: "text-cyan-600",
    bg: "bg-cyan-600/20",
    icon: Building2,
  },
  writing: {
    label: "Writing",
    text: "text-rose-600",
    bg: "bg-rose-600/20",
    icon: PencilLine,
  },
  content_creation: {
    label: "Content",
    text: "text-purple-600",
    bg: "bg-purple-600/20",
    icon: Video,
  },
};

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "personal",
  "work",
  "school",
  "software_development",
  "design",
  "fitness",
  "health",
  "learning",
  "finance",
  "career",
  "daily_routine",
  "travel",
  "home",
  "business",
  "writing",
  "content_creation",
];

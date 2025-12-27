import {
  User,
  Briefcase,
  Dumbbell,
  HeartPulse,
  BookOpen,
  Code,
  Sparkles,
  PiggyBank,
  Plane,
  CalendarCheck,
  UsersRound,
  Home,
  Building2,
  PencilLine,
  LucideIcon,
} from "lucide-react";

export const PROJECT_AREAS = [
  "Personal",
  "Work / Career",
  "Fitness",
  "Health",
  "Learning / Skill development",
  "Software Development",
  "Creativity / Content Creation",
  "Finance",
  "Travel",
  "Daily Routine",
  "Social Life",
  "Home / Organization",
  "Business",
  "Writing",
] as const;

export const PROJECT_AREAS_META: Record<
  string,
  { label: string; text: string; bg: string; icon: LucideIcon }
> = {
  Personal: {
    label: "Personal",
    text: "text-purple-600",
    bg: "bg-purple-600/20",
    icon: User,
  },
  "Work / Career": {
    label: "Work",
    text: "text-blue-600",
    bg: "bg-blue-600/20",
    icon: Briefcase,
  },
  Fitness: {
    label: "Fitness",
    text: "text-green-600",
    bg: "bg-green-600/20",
    icon: Dumbbell,
  },
  Health: {
    label: "Health",
    text: "text-red-600",
    bg: "bg-red-600/20",
    icon: HeartPulse,
  },
  "Learning / Skill development": {
    label: "Learning",
    text: "text-emerald-600",
    bg: "bg-emerald-600/20",
    icon: BookOpen,
  },
  "Software Development": {
    label: "Software",
    text: "text-violet-600",
    bg: "bg-violet-600/20",
    icon: Code,
  },
  "Creativity / Content Creation": {
    label: "Content",
    text: "text-pink-600",
    bg: "bg-pink-600/20",
    icon: Sparkles,
  },
  Finance: {
    label: "Finance",
    text: "text-amber-600",
    bg: "bg-amber-600/20",
    icon: PiggyBank,
  },
  Travel: {
    label: "Travel",
    text: "text-orange-600",
    bg: "bg-orange-600/20",
    icon: Plane,
  },
  "Daily Routine": {
    label: "Routine",
    text: "text-violet-500",
    bg: "bg-violet-500/20",
    icon: CalendarCheck,
  },
  "Social Life": {
    label: "Social",
    text: "text-sky-600",
    bg: "bg-sky-600/20",
    icon: UsersRound,
  },
  "Home / Organization": {
    label: "Organization",
    text: "text-teal-600",
    bg: "bg-teal-600/20",
    icon: Home,
  },
  Business: {
    label: "Business",
    text: "text-cyan-600",
    bg: "bg-cyan-600/20",
    icon: Building2,
  },
  Writing: {
    label: "Writing",
    text: "text-rose-600",
    bg: "bg-rose-600/20",
    icon: PencilLine,
  },
};

export const TIME_COMMITMENT_OPTIONS = [
  "A few minutes per day",
  "1 hour per day",
  "A few hours per week",
  "Weekends only",
  "No idea, surprise me",
];

export const PROJECT_VIBE_OPTIONS = [
  "Productive",
  "Fun",
  "Challenging",
  "Relaxing",
  "Creative",
  "Random / Surprise me",
  "Transformational",
  "Something quick",
  "Something long-term",
];

export const PROJECT_SIZE_OPTIONS = [
  "Small & simple",
  "Medium & structured",
  "Large & ambitious",
  "I'm open to anything",
];

export const EXCLUSION_OPTIONS = [
  "Physical activity",
  "Travel",
  "Money-related tasks",
  "Social tasks",
  "Technology",
  "Writing",
  "Nothing particular",
];

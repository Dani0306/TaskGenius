import type { ProjectStatus } from "@/types";

export const STATUS_META: Record<
  ProjectStatus,
  { label: string; text: string; bg: string }
> = {
  active: {
    label: "Active",
    text: "text-green-600",
    bg: "bg-green-600/20",
  },
  paused: {
    label: "Paused",
    text: "text-yellow-600",
    bg: "bg-yellow-600/20",
  },
  completed: {
    label: "Completed",
    text: "text-purple-600",
    bg: "bg-purple-600/20",
  },
  archived: {
    label: "Archived",
    text: "text-gray-600",
    bg: "bg-gray-600/20",
  },
};

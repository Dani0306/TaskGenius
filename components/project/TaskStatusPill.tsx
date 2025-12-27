const TASK_STATUS_META: Record<
  TaskStatus,
  { label: string; text: string; bg: string }
> = {
  todo: {
    label: "To Do",
    text: "text-blue-700",
    bg: "bg-blue-100", // light blue
  },
  in_progress: {
    label: "In Progress",
    text: "text-blue-700",
    bg: "bg-blue-200",
  },
  done: {
    label: "Completed",
    text: "text-emerald-700",
    bg: "bg-emerald-200",
  },
};

import type { TaskStatus } from "@/types";

type Size = "sm" | "md" | "lg";

const SIZE_STYLES: Record<Size, string> = {
  sm: "text-[10px] px-2 py-1 rounded-md",
  md: "text-xs px-2.5 py-2 rounded-lg",
  lg: "text-sm px-3 py-[6px] rounded-xl",
};

export default function TaskStatusPill({
  status,
  size = "md",
}: {
  status: TaskStatus;
  size?: Size;
}) {
  const meta = TASK_STATUS_META[status];

  return (
    <span
      className={`inline-flex items-center font-medium w-max ${SIZE_STYLES[size]} ${meta.bg} ${meta.text}`}
    >
      {meta.label}
    </span>
  );
}

import type { TaskPriority } from "@/types";

const PRIORITY_META: Record<
  TaskPriority,
  { label: string; text: string; bg: string }
> = {
  low: {
    label: "Low",
    text: "text-slate-700",
    bg: "bg-slate-200",
  },
  medium: {
    label: "Medium",
    text: "text-blue-700",
    bg: "bg-blue-200",
  },
  high: {
    label: "High",
    text: "text-amber-700",
    bg: "bg-amber-200",
  },
  urgent: {
    label: "Urgent",
    text: "text-red-700",
    bg: "bg-red-200",
  },
};

type Size = "sm" | "md" | "lg";

const SIZE_STYLES: Record<Size, string> = {
  sm: "text-[10px] px-2 py-1 rounded-md",
  md: "text-xs px-2.5 py-2 rounded-lg",
  lg: "text-sm px-3 py-[6px] rounded-xl",
};

export default function PriorityPill({
  priority,
  size = "md",
}: {
  priority: TaskPriority;
  size?: Size;
}) {
  const meta = PRIORITY_META[priority];

  return (
    <span
      className={`inline-flex items-center font-medium w-max ${SIZE_STYLES[size]} ${meta.bg} ${meta.text}`}
    >
      {meta.label} priority
    </span>
  );
}

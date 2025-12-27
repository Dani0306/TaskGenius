import { getDueMeta } from "@/lib/utils";

type DueStatus = "overdue" | "today" | "tomorrow" | "future";
type DuePillSize = "sm" | "md" | "lg";

const SIZE_STYLES: Record<DuePillSize, string> = {
  sm: "text-[10px] px-2 py-0.5 rounded-md",
  md: "text-xs px-2.5 py-[5px] rounded-lg",
  lg: "text-sm px-3 py-[6px] rounded-xl",
};

const STATUS_STYLES: Record<
  DueStatus,
  { text: string; bg: string; border: string }
> = {
  overdue: {
    text: "text-red-700",
    bg: "bg-red-100",
    border: "border-red-300",
  },
  today: {
    text: "text-emerald-700",
    bg: "bg-emerald-100",
    border: "border-emerald-300",
  },
  tomorrow: {
    text: "text-amber-700",
    bg: "bg-amber-100",
    border: "border-amber-300",
  },
  future: {
    text: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary",
  },
};

type DueDatePillProps = {
  date: string;
  size?: DuePillSize;
  className?: string;
};

export function DueDatePill({
  date,
  size = "md",
  className = "",
}: DueDatePillProps) {
  const { label, status } = getDueMeta(date);
  const styles = STATUS_STYLES[status];

  return (
    <span
      className={`
        inline-flex w-max items-center font-medium 
        border
        ${SIZE_STYLES[size]} 
        ${styles.text} 
        ${styles.bg} 
        ${styles.border}
        ${className}
      `}
    >
      {label}
    </span>
  );
}

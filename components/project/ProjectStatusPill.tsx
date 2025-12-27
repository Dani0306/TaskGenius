import { STATUS_META } from "@/constants/project/projectStatus";
import type { ProjectStatus } from "@/types";

type Size = "sm" | "md" | "lg";

const SIZE_STYLES: Record<Size, string> = {
  sm: "text-[10px] px-2 py-1 rounded-md",
  md: "text-xs px-2.5 py-2 rounded-lg",
  lg: "text-sm px-3 py-[6px] rounded-xl",
};

export default function ProjectStatusPill({
  status,
  size = "md",
}: {
  status: ProjectStatus;
  size?: Size;
}) {
  const meta = STATUS_META[status];

  return (
    <span
      className={`inline-flex items-center font-medium w-max ${SIZE_STYLES[size]} ${meta.bg} ${meta.text}`}
    >
      {meta.label}
    </span>
  );
}

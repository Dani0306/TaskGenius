import { LucideIcon } from "lucide-react";
import React from "react";

const ProjectIconPill = ({
  icon: Icon,
  meta,
}: {
  icon: LucideIcon;
  meta: { text: string; bg: string; label: string };
}) => {
  return (
    <div
      className={`flex items-center justify-center space-x-3  ${meta.text} ${meta.bg} rounded-full py-1 px-5`}
    >
      <Icon className={`size-5 rounded-xl`} />
      <span className="text-xs">{meta.label}</span>
    </div>
  );
};

export default ProjectIconPill;

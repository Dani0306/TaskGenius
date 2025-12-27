"use client";

import { X } from "lucide-react";

type FilterPillProps = {
  label: string;
  value: string;
  onRemove?: () => void;
};

export default function FilterPill({
  label,
  value,
  onRemove,
}: FilterPillProps) {
  return (
    <div
      className="
        group
        inline-flex items-center gap-2
        px-3 py-1.5 rounded-full
        bg-primary/10 text-primary font-medium
        text-sm shadow-sm border border-primary/20
        transition-all
      "
    >
      {/* Label + Value */}
      <span>
        <span className="font-semibold">{label}:</span> {value}
      </span>

      {/* Hover-remove icon */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="
            transition-opacity duration-200
            rounded-full p-1 bg-primary/20
          "
        >
          <X className="h-3.5 w-3.5 cursor-pointer" />
        </button>
      )}
    </div>
  );
}

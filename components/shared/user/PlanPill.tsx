"use client";

import { cn } from "@/lib/utils";
import type { Plan } from "@/types";

type PillSize = "sm" | "md" | "lg";

interface PlanPillProps {
  plan: Plan;
  size?: PillSize;
}

const PLAN_LABELS: Record<Plan, string> = {
  starter: "Starter",
  pro: "Pro",
  team: "Team",
};

export default function PlanPill({ plan, size = "md" }: PlanPillProps) {
  const sizeStyles: Record<PillSize, string> = {
    sm: "text-[10px] px-2 py-[2px]",
    md: "text-[11px] px-2.5 py-[3px]",
    lg: "text-xs px-3 py-[6px]",
  };

  const baseClasses = cn(
    "inline-flex items-center font-medium rounded-full transition-all",
    sizeStyles[size]
  );

  const stylesByPlan: Record<Plan, string> = {
    starter: "bg-[#f5f3ff] text-[#6b21a8] border border-[#e9d5ff]",
    pro: "bg-[linear-gradient(135deg,#a855f7,#7c3aed)] text-white shadow-[0_4px_12px_rgba(124,58,237,0.25)]",
    team: "bg-[#eef2ff] text-[#4338ca] border border-[#c7d2fe]",
  };

  return (
    <span className={cn(baseClasses, stylesByPlan[plan])}>
      {PLAN_LABELS[plan]}
    </span>
  );
}

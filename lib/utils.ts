import { Project, Subtask } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  isToday,
  isTomorrow,
  isPast,
  isThisWeek,
  isThisMonth,
  isAfter,
  startOfToday,
  startOfWeek,
  endOfWeek,
  parseISO,
  isWithinInterval,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// * Get animation delay

export function getAnimationDelay(index: number, inView: boolean) {
  if (inView && index === 0) return "slide-in-left delay-3";
  if (inView && index === 1) return "slide-in-left delay-1";
  if (inView && index === 2) return "slide-in-right delay-1";
  if (inView && index === 3) return "slide-in-right delay-3";
}

// * Get rating stars

export function calculateStarFillPercentages(rating: number) {
  return [1, 2, 3, 4, 5].map((position) => {
    if (position <= Math.floor(rating)) {
      return 100;
    }

    if (position > Math.ceil(rating)) {
      return 0;
    }

    return Math.round((rating % 1) * 100);
  });
}

// * Get project progress

export function getProjectProgress(project: Project) {
  const completed = project.tasks?.reduce(
    (acc, el) => (el.status === "done" ? (acc += 1) : acc),
    0
  );
  const todo = project.tasks?.length;

  return {
    progress: todo === 0 ? 0 : Math.floor((completed! / todo!) * 100),
    completed,
    todo,
  };
}

// * Get task progress

export function getTaskProgress(subtasks?: Subtask[] | null) {
  const list = Array.isArray(subtasks) ? subtasks : [];

  const completed = list.reduce(
    (acc, el) => acc + (el.status === "done" ? 1 : 0),
    0
  );
  const total = list.length;

  return {
    progress: total === 0 ? 0 : Math.floor((completed / total) * 100),
    completed,
    todo: total,
  };
}
// * Format Due Date

type DueStatus = "overdue" | "today" | "tomorrow" | "future";

export function getDueMeta(dateString: string): {
  label: string;
  status: DueStatus;
} {
  const target = new Date(dateString);
  const today = new Date();

  // Normalize to midnight
  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffMs = target.getTime() - today.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { label: "Overdue", status: "overdue" };
  }
  if (diffDays === 0) {
    return { label: "Today", status: "today" };
  }
  if (diffDays === 1) {
    return { label: "Tomorrow", status: "tomorrow" };
  }

  return { label: `In ${diffDays} days`, status: "future" };
}

// * Normalize query string

export function normalize(s: unknown): string {
  if (s == null) return "";
  return String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

export function isPastDate(date: Date): boolean {
  const now = new Date();
  return date <= now;
}

// * Returns project's due date

import { addDays, addWeeks, addMonths, addYears } from "date-fns";

export function getDueDate(timeframe: string): Date {
  const now = new Date();

  switch (timeframe) {
    case "Today":
      return now;

    case "Tomorrow":
      return addDays(now, 1);

    case "In 3 Days":
      return addDays(now, 3);

    case "1 Week":
      return addWeeks(now, 1);

    case "2 Weeks":
      return addWeeks(now, 2);

    case "1 Month":
      return addMonths(now, 1);

    case "6 Weeks":
      return addWeeks(now, 6);

    case "2 Months":
      return addMonths(now, 2);

    case "3 Months":
      return addMonths(now, 3);

    case "6 Months":
      return addMonths(now, 6);

    case "1 Year":
      return addYears(now, 1);

    default:
      throw new Error(`Invalid timeframe: ${timeframe}`);
  }
}

// * Matches due date filter

const toLocalDateOnly = (iso: string) => {
  const d = parseISO(iso);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

export const matchesDueDateFilter = (dueDateISO: string, filter: string) => {
  const date = toLocalDateOnly(dueDateISO);
  const today = startOfToday();

  switch (filter) {
    case "overdue":
      return isPast(date) && !isToday(date);

    case "today":
      return isToday(date);

    case "tomorrow":
      return isTomorrow(date);

    case "this_week":
      return isThisWeek(date, { weekStartsOn: 1 });

    case "next_week": {
      const start = startOfWeek(addWeeks(today, 1), { weekStartsOn: 1 });
      const end = endOfWeek(addWeeks(today, 1), { weekStartsOn: 1 });

      return isWithinInterval(date, { start, end });
    }

    case "this_month":
      return isThisMonth(date);

    case "future":
      return isAfter(date, today);

    default:
      return true;
  }
};

// * Local data filtering

export function filterData<T>(opts: {
  data: T[];
  q: string;
  accessors: Array<(item: T) => unknown>;
}): T[] {
  const { data, q, accessors } = opts;
  if (!q) return data;

  const normalize = (v: unknown): string => {
    if (v === null || v === undefined) return "";
    if (typeof v === "boolean") {
      // Add synonyms so "active"/"inactive", "yes"/"no" match too
      return v
        ? "true yes 1 active enabled pending open"
        : "false no 0 inactive graded disabled closed";
    }
    if (typeof v === "number") return String(v);
    return String(v)
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, ""); // strip accents
  };

  // tokens makes multi-word searches (“john doe”) work
  const tokens = q
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => normalize(t));

  return data.filter((item) => {
    const haystacks = accessors.map((a) => normalize(a(item)));
    const joined = haystacks.join(" ");
    // require all tokens to be present
    return tokens.every((t) => joined.includes(t));
  });
}

// * Format to DD/MM/YY

export function formatDateDDMMYY(isoDate: string): string {
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
}

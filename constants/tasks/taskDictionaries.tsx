import { TaskPriority, TaskStatus } from "@/types";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

// * Task status convertor

export function resolveTaskStatus(input: string): TaskStatus | string {
  // value → label
  if (input in TASK_STATUS_LABELS) {
    return TASK_STATUS_LABELS[input as TaskStatus];
  }

  // label → value
  const entry = Object.entries(TASK_STATUS_LABELS).find(
    ([, label]) => label.toLowerCase() === input.toLowerCase()
  );

  return entry ? (entry[0] as TaskStatus) : input;
}

// * Task priority convertor

export function resolveTaskPriority(input: string): TaskPriority | string {
  // value → label
  if (input in TASK_PRIORITY_LABELS) {
    return TASK_PRIORITY_LABELS[input as TaskPriority];
  }

  // label → value
  const entry = Object.entries(TASK_PRIORITY_LABELS).find(
    ([, label]) => label.toLowerCase() === input.toLowerCase()
  );

  return entry ? (entry[0] as TaskPriority) : input;
}

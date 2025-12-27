import {
  resolveTaskPriority,
  resolveTaskStatus,
} from "@/constants/tasks/taskDictionaries";
import type { AppUser, Task, TaskPriority, TaskStatus } from "@/types";
import { useMemo, useState } from "react";

export function useTaskEditor(task: Task) {
  const [statusLabel, setStatusLabel] = useState("");
  const [priorityLabel, setPriorityLabel] = useState("");
  const [draftSubtasks, setDraftSubtasks] = useState(task.subtasks ?? []);
  const [currentlyAssigned, setCurrentlyAssigned] = useState<AppUser>(
    task.user
  );

  const effectiveStatus = useMemo<TaskStatus>(() => {
    return statusLabel
      ? (resolveTaskStatus(statusLabel) as TaskStatus)
      : task.status;
  }, [statusLabel, task.status]);

  const effectiveAssigned = useMemo<AppUser>(() => {
    return currentlyAssigned;
  }, [currentlyAssigned]);

  const effectivePriority = useMemo<TaskPriority>(() => {
    return priorityLabel
      ? (resolveTaskPriority(priorityLabel) as TaskPriority)
      : task.priority;
  }, [priorityLabel, task.priority]);

  const hasSubtaskChanges = useMemo(() => {
    const original = task.subtasks ?? [];
    const current = draftSubtasks ?? [];

    if (original.length !== current.length) return true;

    const originalMap = new Map(original.map((s) => [s.id, s]));
    for (const s of current) {
      const o = originalMap.get(s.id);
      if (!o) return true;
      if (o.status !== s.status) return true;
      if ((o.description ?? "") !== (s.description ?? "")) return true;
    }
    return false;
  }, [task.subtasks, draftSubtasks]);

  const hasChanges = useMemo(() => {
    return (
      effectiveStatus !== task.status ||
      effectivePriority !== task.priority ||
      effectiveAssigned.user_id !== task.user.user_id ||
      hasSubtaskChanges
    );
  }, [
    effectiveAssigned,
    effectiveStatus,
    effectivePriority,
    task.status,
    task.priority,
    hasSubtaskChanges,
    task.user.user_id,
  ]);

  const setSubtaskStatus = (id: string, status: TaskStatus) => {
    setDraftSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  return {
    statusLabel,
    setStatusLabel,
    priorityLabel,
    setPriorityLabel,
    subtasks: draftSubtasks,
    setSubtasks: setDraftSubtasks, // optional if you need full control
    setSubtaskStatus,
    effectiveStatus,
    effectivePriority,
    hasChanges,
    currentlyAssigned,
    setCurrentlyAssigned,
  };
}

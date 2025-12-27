"use server";

import { Subtask } from "@/types";
import { createServerSupabase } from "@/utils/supabase/server";

export const getProject = async (projectId: string) => {
  const supabase = await createServerSupabase();

  const [
    { data: project, error: projectError },
    { data: tasks, error: tasksError },
    { data: memberRows, error: membersError },
    { data: subtasks, error: subtasksError },
  ] = await Promise.all([
    supabase.from("projects").select("*").eq("id", projectId).single(),
    supabase
      .from("tasks")
      .select(
        `
        *,
        user:users (
          user_id,
          name,
          email,
          image_url,
          plan,
          created_at,
          updated_at
        )
      `
      )
      .eq("project_id", projectId)
      .order("created_at", { ascending: false }),

    supabase
      .from("project_members")
      .select(
        `
        project_id,
        user_id,
        users (
          user_id,
          name,
          email,
          image_url,
          plan,
          created_at,
          updated_at
        )
      `
      )
      .eq("project_id", projectId),
    supabase.from("subtasks").select("*").eq("project_id", projectId),
  ]);

  if (projectError) throw new Error(projectError.message);
  if (tasksError) throw new Error(tasksError.message);
  if (membersError) throw new Error(membersError.message);
  if (subtasksError) throw new Error(subtasksError.message);

  const members =
    // eslint-disable-next-line
    memberRows?.map((row: any) => row.users).filter(Boolean) ?? [];

  const projectTasks = tasks.map((task) => {
    const id = task.id;
    const taskSubtasks: Subtask[] = [];

    subtasks?.forEach((subtask) => {
      if (subtask.task_id === id) taskSubtasks.push(subtask);
    });

    return {
      ...task,
      subtasks: taskSubtasks,
    };
  });

  return {
    ...project,
    tasks: projectTasks ?? [],
    members,
  };
};

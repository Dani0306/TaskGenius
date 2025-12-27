"use server";

import { TaskPriority, TaskStatus } from "@/types";
import { createServerSupabase } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const modifyTask = async (
  taskId: string,
  data: {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    due_date?: Date;
    user?: string;
    status?: TaskStatus;
  }
) => {
  const supabase = await createServerSupabase();

  const { data: task, error } = await supabase
    .from("tasks")
    .update({
      ...data,
    })
    .eq("id", taskId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/app/project/[id]");

  return task;
};

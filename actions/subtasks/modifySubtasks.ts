"use server";

import { TaskStatus } from "@/types";
import { createServerSupabase } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const modifySubtasks = async (
  updatedTasks: Array<{ id: string; status?: TaskStatus; description?: string }>
) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("subtasks")

    .upsert(updatedTasks);

  if (error) throw Error(error.message);

  revalidatePath("/app/project/[id]");

  return data;
};

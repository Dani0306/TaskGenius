"use server";

import { TaskToInsert } from "@/types";
import { createServerSupabase } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const createTask = async (tasks: TaskToInsert[]) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase.from("tasks").insert(tasks).select(); // returns ALL inserted rows

  if (error) throw new Error(error.message);

  revalidatePath("/app/project/[id]");

  return data; // array of inserted tasks
};

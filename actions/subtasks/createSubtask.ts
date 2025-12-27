"use server";

import { SubtaskToInsert } from "@/types";
import { createServerSupabase } from "@/utils/supabase/server";

export const createSubTasks = async (subtasks: SubtaskToInsert[]) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("subtasks")
    .insert(subtasks)
    .select();

  if (error) throw new Error(error.message);

  return data;
};

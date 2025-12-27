"use server";

import { createServerSupabase } from "@/utils/supabase/server";

export const getTasksFromProject = async (projectId: string) => {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};

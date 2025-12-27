"use server";

import { createServerSupabase } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteProject = async (projectId: string) => {
  const supabase = await createServerSupabase();

  // 1. Ensure user is authenticated
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    throw new Error("Not authenticated");
  }

  // 2. Delete tasks for this project (optional if you have ON DELETE CASCADE)
  const { error: tasksError } = await supabase
    .from("tasks")
    .delete()
    .eq("project_id", projectId);

  if (tasksError) {
    throw new Error(tasksError.message);
  }

  // 3. Delete the project, ensuring it's owned by the current user
  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId)
    .eq("user_id", user.id) // protect against unauthorized deletes
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // 4. Revalidate projects page
  revalidatePath("/app/projects");

  return data; // deleted project row
};

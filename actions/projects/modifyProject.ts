"use server";

import { ProjectUpdateData } from "@/types";
import { createServerSupabase } from "@/utils/supabase/server";

export const modifyProject = async (
  projectId: string,
  projectData: ProjectUpdateData
) => {
  const supabase = await createServerSupabase();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("projects")
    .update({
      ...projectData,
    })
    .eq("id", projectId)
    .eq("user_id", user.id) // protect against unauthorized deletes
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

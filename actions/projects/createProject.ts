"use server";

import { ProjectInsert } from "@/types";
import { createServerSupabase } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const createProject = async (project: ProjectInsert) => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();

  if (error) {
    console.error("Failed to create the project: ", error.message);
    throw new Error("Failed to create the project");
  }

  revalidatePath("/app/projects");

  return data;
};

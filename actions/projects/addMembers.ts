"use server";

import { createServerSupabase } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const addMembers = async (projectId: string, users: string[]) => {
  const supabase = await createServerSupabase();

  const members = users.map((user) => ({
    project_id: projectId,
    user_id: user,
  }));

  const { error } = await supabase.from("project_members").insert(members);

  if (error) throw new Error(error.message);

  revalidatePath("/app/project/[id]");

  return true;
};

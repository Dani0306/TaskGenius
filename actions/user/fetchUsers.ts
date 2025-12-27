"use server";

import { createServerSupabase } from "@/utils/supabase/server";

export const fetchUsers = async (query: string) => {
  const supabase = await createServerSupabase();

  // 1. Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  // 2. Query all users EXCEPT the logged-in user
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .neq("user_id", user.id) // ⬅️ exclude yourself
    .or(`email.ilike.%${query}%,name.ilike.%${query}%`); // search filters

  if (error) throw new Error(error.message);

  return data;
};

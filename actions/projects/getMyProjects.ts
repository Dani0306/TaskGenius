"use server";

import { Project, ProjectStatus } from "@/types";
import { createServerSupabase } from "@/utils/supabase/server";

type ProjectFilters = {
  name?: string;
  status?: ProjectStatus;
  category?: string;
};

export const getMyProjects = async (filters: ProjectFilters) => {
  const supabase = await createServerSupabase();

  // 1. Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  const userId = user.id;

  // Helper to apply filters to different queries
  // eslint-disable-next-line
  const applyFilters = (query: any) => {
    if (filters.status) {
      query = query.eq("status", filters.status);
    }

    if (filters.name && filters.name.trim() !== "") {
      query = query.ilike("name", `%${filters.name.trim()}%`);
    }

    if (filters.category) {
      query = query.eq("category", filters.category);
    }

    return query.order("created_at", { ascending: false });
  };

  // 2A. Projects where user is the OWNER
  const { data: ownedProjects, error: ownedError } = await applyFilters(
    supabase.from("projects").select("*").eq("user_id", userId)
  );

  if (ownedError) throw new Error(ownedError.message);

  // 2B. Get all project_ids where the user is a MEMBER
  const { data: membershipRows, error: membershipError } = await supabase
    .from("project_members")
    .select("project_id")
    .eq("user_id", userId);

  if (membershipError) throw new Error(membershipError.message);

  const memberProjectIds = Array.from(
    new Set((membershipRows ?? []).map((r) => r.project_id))
  ).filter(
    (id) => !(ownedProjects ?? []).some((p: Project) => p.id === id) // avoid duplicates
  );

  // 2C. Projects where user is a MEMBER (but not owner)

  // eslint-disable-next-line
  let memberProjects: any[] = [];
  if (memberProjectIds.length > 0) {
    const { data: memberProjectsData, error: memberProjectsError } =
      await applyFilters(
        supabase.from("projects").select("*").in("id", memberProjectIds)
      );

    if (memberProjectsError) throw new Error(memberProjectsError.message);
    memberProjects = memberProjectsData ?? [];
  }

  // 2D. Combine owned + member projects
  const projects = [...(ownedProjects ?? []), ...memberProjects];

  if (!projects.length) return [];

  const projectIds = projects.map((p) => p.id);

  // 3. Fetch all tasks for those projects in ONE query
  const { data: tasks, error: tasksError } = await supabase
    .from("tasks")
    .select("*")
    .in("project_id", projectIds);

  if (tasksError) throw new Error(tasksError.message);

  // eslint-disable-next-line
  const tasksByProject = new Map<string, any[]>();

  for (const task of tasks ?? []) {
    const arr = tasksByProject.get(task.project_id) ?? [];
    arr.push(task);
    tasksByProject.set(task.project_id, arr);
  }

  // 4. Fetch all members (with full user data) for those projects in ONE query
  // project_members: project_id, user_id, users(...)
  const { data: membersRows, error: membersError } = await supabase
    .from("project_members")
    .select(
      `
      project_id,
      user:users (
        user_id,
        name,
        email,
        image_url,
        plan,
        created_at,
        updated_at
      )
    `
    )
    .in("project_id", projectIds);

  if (membersError) throw new Error(membersError.message);

  // eslint-disable-next-line
  const membersByProject = new Map<string, any[]>();

  for (const row of membersRows ?? []) {
    const list = membersByProject.get(row.project_id) ?? [];
    // row.user contains the full user object from "users"
    if (row.user) list.push(row.user);
    membersByProject.set(row.project_id, list);
  }

  // 5. Attach tasks + members (+ memberCount if you want) to each project
  const projectsWithExtras = projects.map((project) => {
    const members = membersByProject.get(project.id) ?? [];
    return {
      ...project,
      tasks: tasksByProject.get(project.id) ?? [],
      members,
      memberCount: members.length,
    };
  });

  return projectsWithExtras;
};

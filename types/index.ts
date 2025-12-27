export type Plan = "starter" | "pro" | "team";
export type ProjectStatus = "active" | "paused" | "completed" | "archived";
export type ProjectCategory =
  | "personal"
  | "work"
  | "school"
  | "software_development"
  | "design"
  | "fitness"
  | "health"
  | "learning"
  | "finance"
  | "career"
  | "daily_routine"
  | "travel"
  | "home"
  | "business"
  | "writing"
  | "content_creation";

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type AppUser = {
  created_at: Date;
  name: string;
  email: string;
  image_url: string;
  updated_at: Date;
  plan: Plan;
  user_id?: string;
};

export type Project = {
  id: string;
  created_at: Date;
  user_id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  updated_at: Date;
  category: ProjectCategory;
  due_date: Date;
  tasks: Task[];
  members: AppUser[];
};

export type Task = {
  id: string; // set default by supabase
  created_at: string; // set default by supabase
  project_id: string; // set default by me
  user: AppUser; // set default by me
  title: string;
  description: string;
  status: TaskStatus; // at first is always "todo"
  priority: TaskPriority;
  due_date: string;
  completed_at: string; // set once the task is completed
  updated_at: string; // set only when task is modified
  subtasks: Subtask[];
};

export type ProjectInsert = {
  user_id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  category: ProjectCategory;
  due_date: Date;
};

export type ProjectUpdateData = {
  name: string;
  description: string;
  status: ProjectStatus;
  members: string[];
  category: string;
};

export type TaskToInsert = {
  project_id: string;
  user: string;
  title: string;
  description: string;
  priority: string;
  due_date: Date;
};

export type Subtask = {
  id: string;
  created_at: string;
  task_id: string;
  project_id: string;
  description: string;
  status: "todo" | "in_progress" | "done";
};

export type SubtaskToInsert = {
  task_id: string;
  project_id: string;
  description: string;
  status: TaskStatus;
};

// * Search Params props

export interface SearchParamProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export type Members = {
  user_id: string;
  project_id: string;
};

export type AIProjectIdea = {
  title: string;
  description: string;
  category: ProjectCategory;
  due_date: Date;
  timeframe: string; // e.g. "3 weeks", "1 month", "In 3 days"
  goal: string;
  constraints: string[];

  tasks: {
    title: string;
    description: string;
    priority: TaskPriority;
    due_date: string; // ISO string: "2025-01-10"
    subtasks: Subtask[];
  }[];
};

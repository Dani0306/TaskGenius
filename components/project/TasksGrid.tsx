"use client";

import { Project, Task } from "@/types";
import React, { useMemo } from "react";
import TaskCard from "./TaskCard";
import { User } from "@supabase/supabase-js";
import { useFilters } from "@/hooks/filters/useFilters";
import { matchesDueDateFilter } from "@/lib/utils";

const TasksGrid = ({ project, user }: { project: Project; user: User }) => {
  // eslint-disable-next-line
  const baseTasks: Task[] = project.tasks ?? [];
  const { getAll } = useFilters();

  // filters comes from URL/searchParams inside your hook
  const filters = getAll();

  const filteredTasks = useMemo(() => {
    let result = [...baseTasks];

    if (filters.status) {
      result = result.filter((task) => task.status === filters.status);
    }

    if (filters.priority) {
      result = result.filter((task) => task.priority === filters.priority);
    }

    if (filters.dueDate) {
      result = result.filter((task) =>
        matchesDueDateFilter(task.due_date, filters.dueDate)
      );
    }

    if (filters.assigned) {
      result = result.filter((task) => task.user.user_id === filters.assigned);
    }

    return result;
  }, [baseTasks, filters]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-12">
      {filteredTasks.length > 0 ? (
        <>
          {filteredTasks.map((task) => (
            <TaskCard project={project} user={user} key={task.id} task={task} />
          ))}
        </>
      ) : (
        <span>No results found.</span>
      )}
    </div>
  );
};

export default TasksGrid;

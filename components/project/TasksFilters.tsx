"use client";

import { useFilters } from "@/hooks/filters/useFilters";
import FilterPill from "./FilterPill";
import { X } from "lucide-react";
import {
  TASK_FILTER_LABELS,
  TASK_FILTER_LABELS_TYPES,
} from "@/constants/tasks/tasksFilters";

const TasksFilters = () => {
  const { getAll, clearFilter, clearAll } = useFilters();
  const currentFilters = Object.entries(getAll());

  return (
    <>
      {currentFilters.length > 0 && (
        <div className="flex mt-8 items-center flex-wrap gap-4">
          {currentFilters.map((filter, index) => (
            <FilterPill
              key={index}
              label={TASK_FILTER_LABELS_TYPES[filter[0]]}
              value={TASK_FILTER_LABELS[filter[1]]}
              onRemove={() => clearFilter({ type: filter[0] })}
            />
          ))}
          {currentFilters.length > 0 && (
            <X
              className="p-2 size-8 text-red-700 bg-red-500/20 rounded-full cursor-pointer"
              onClick={() => clearAll()}
            />
          )}
        </div>
      )}
    </>
  );
};

export default TasksFilters;

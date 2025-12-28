"use client";

import PageButton from "../shared/PageButton";
import { Plus } from "lucide-react";
import FilterButton from "./FilterButton";
import { TASK_FILTERS } from "@/constants/tasks/tasksFilters";
import TasksFilters from "./TasksFilters";
import { useModal } from "@/providers/context/AppModalProvider";
import ModalContainer from "../modal/ModalContainer";
import { Project } from "@/types";
import { User } from "@supabase/supabase-js";
import ChooseTaskTypeToCreate from "./ChooseTaskTypeToCreate";

const TasksHeader = ({ project, user }: { project: Project; user: User }) => {
  const { openModal } = useModal();

  const handleAddTask = () => {
    openModal(
      <ModalContainer size="lg">
        <ChooseTaskTypeToCreate project={project} user={user} />
      </ModalContainer>
    );
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between mt-10">
        <div className="flex space-x-2 flex-wrap space-y-6 lg:space-y-0">
          {TASK_FILTERS.map((item) => (
            <FilterButton
              user={user}
              key={item.label}
              value={item.value}
              label={item.label}
              options={item.options}
            />
          ))}
        </div>
        <div className="w-max mt-9 lg:mt-0">
          <PageButton onClick={handleAddTask} text="New Task" logo={Plus} />
        </div>
      </div>
      <TasksFilters />
    </div>
  );
};

export default TasksHeader;

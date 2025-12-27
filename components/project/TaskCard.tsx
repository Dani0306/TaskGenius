import { Project, Task } from "@/types";
import TaskStatusPill from "./TaskStatusPill";
import PriorityPill from "./TaskPriorityPill";
import { DueDatePill } from "./DueDatePill";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { useModal } from "@/providers/context/AppModalProvider";
import ConfirmModal from "../modal/ConfirmModal";
import { deleteTask } from "@/actions/tasks";
import { useToast } from "@/providers/toast/ToastProvider";
import ModalContainer from "../modal/ModalContainer";
import AssignTaskModal from "../task/AssignTaskModal";
import TaskModal from "../task/TaskModal";
import ProgressBar from "./ProgressBar";
import { getTaskProgress } from "@/lib/utils";

const TaskCard = ({
  task,
  user,
  project,
}: {
  task: Task;
  user: User;
  project: Project;
}) => {
  const { openModal } = useModal();

  const { toast } = useToast();

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id).catch((err) => {
      toast({
        type: "error",
        title: "Error deleting task.",
        description: err.message ?? "Unkown error.",
      });
    });

    toast({
      type: "success",
      title: "Task deleted successfully!",
      description: "The task was already removed from your project!",
    });
  };

  const confirmDeleteTask = () => {
    openModal(
      <ConfirmModal
        message={`Are you sure you want to delete task ${task.title}`}
        fn={() => handleDeleteTask(task.id)}
      />
    );
  };

  const handleAssignTask = () => {
    openModal(
      <ModalContainer size="lg">
        <AssignTaskModal project={project} task={task} />
      </ModalContainer>
    );
  };

  const handleViewTask = () => {
    openModal(
      <ModalContainer size="lg">
        <TaskModal task={task} project={project} />
      </ModalContainer>
    );
  };

  return (
    <div
      onClick={handleViewTask}
      className="w-full flex flex-col bg-white space-y-5 p-6 rounded-xl shadow-xl cursor-pointer hover:scale-[1.02] transition-all duration-500"
    >
      <div className="flex items-start justify-between space-x-2">
        <strong className="font-bold text-black text-xl max-w-[90%]">
          {task.title}
        </strong>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Ellipsis className="text-black size-4.5 " />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Project Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={confirmDeleteTask}
              className="cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleAssignTask}
              className="cursor-pointer"
            >
              Assign
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col space-y-3 items-start space-x-4 rounded-xl border border-[#E4DDFF] dark:border-violet-900/60 bg-[#F0ECFF] dark:bg-violet-900/20 p-4">
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          {task.description}
        </p>
      </div>
      <ProgressBar progress={getTaskProgress(task.subtasks).progress} />

      <div className="flex space-x-3 items-center">
        <TaskStatusPill status={task.status} />
        <PriorityPill priority={task.priority} />
        <DueDatePill date={String(task.due_date)} />
      </div>
      <div className="w-full mx-auto border-b border-gray-300 my-2" />
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-[30px] h-[30px] relative">
            <Image
              src={task.user.image_url ?? "/"}
              alt="Profile picture"
              fill
              className="rounded-full"
            />
          </div>
          <strong className="text-sm font-medium">
            {task.user?.name} {task.user.user_id === user.id && "(me)"}
          </strong>
        </div>
        <span className="text-sm text-gray-600">1/3 Subtasks</span>
      </div>
    </div>
  );
};

export default TaskCard;

import { Project, Subtask, Task, TaskPriority, TaskStatus } from "@/types";
import {
  Bookmark,
  Check,
  CheckSquare,
  Clipboard,
  ListChecks,
  LucideIcon,
  Plus,
  Share,
  Sparkles,
  Text,
} from "lucide-react";
import { useRef, useState } from "react";
import SelectOptions from "../shared/select/SelectOptions";
import Image from "next/image";
import { DueDatePill } from "../project/DueDatePill";
import { formatDateDDMMYY, getTaskProgress } from "@/lib/utils";
import { useModal } from "@/providers/context/AppModalProvider";
import TaskStatusPill from "../project/TaskStatusPill";
import PriorityPill from "../project/TaskPriorityPill";
import CreatProjectModalActionButtons from "../projects/CreatProjectModalActionButtons";
import { modifyTask } from "@/actions/tasks";
import { useToast } from "@/providers/toast/ToastProvider";
import LoaderSpinner from "../shared/loader/LoaderSpinner";
import {
  resolveTaskPriority,
  resolveTaskStatus,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from "@/constants/tasks/taskDictionaries";
import { modifySubtasks } from "@/actions/subtasks/modifySubtasks";
import AssignTaskUsersList from "./AssignTaskUsersList";
import { useTaskEditor } from "@/hooks/task/useTaskEditor";
import { useClickOutside } from "@/hooks/clickOutside/useClickOutside";
import CreateSubtaskWindow from "./CreateSubtaskWindow";
import ProgressBar from "../project/ProgressBar";

const TaskModal = ({ task, project }: { task: Task; project: Project }) => {
  const [showAssign, setShowAssign] = useState<boolean>(false);
  const [showAddSubtask, setShowAddSubtask] = useState<boolean>(false);
  const assignWindowRef = useRef<HTMLDivElement>(null);
  const subtaskWindowRef = useRef<HTMLDivElement>(null);

  useClickOutside(assignWindowRef, () => setShowAssign(false), showAssign);
  useClickOutside(
    subtaskWindowRef,
    () => setShowAddSubtask(false),
    showAddSubtask
  );
  const {
    statusLabel,
    setStatusLabel,
    priorityLabel,
    setPriorityLabel,
    hasChanges,
    subtasks,
    setSubtaskStatus,
    currentlyAssigned,
    setCurrentlyAssigned,
    setSubtasks,
  } = useTaskEditor(task);

  const [loading, setLoading] = useState<boolean>(false);

  const onSubtaskStatusChange = (id: string, status: TaskStatus) => {
    setSubtaskStatus(id, status);
  };

  const { closeModal } = useModal();
  const { toast } = useToast();

  const handleModifyTask = async () => {
    setLoading(true);
    await modifyTask(task.id, {
      status: statusLabel
        ? (resolveTaskStatus(statusLabel) as TaskStatus)
        : task.status,
      priority: priorityLabel
        ? (resolveTaskPriority(priorityLabel) as TaskPriority)
        : task.priority,
    }).catch((err) => {
      toast({
        type: "error",
        title: "Error modifying task.",
        description: err.message ?? "Unkonw error.",
      });
    });

    await modifySubtasks(
      subtasks.map((item) => ({
        id: item.id,
        status: item.status,
        description: item.description,
      }))
    )
      .catch((err) => {
        toast({
          type: "error",
          title: "Error modifying subtasks.",
          description: err.message ?? "Unkonw error.",
        });
      })
      .finally(() => setLoading(false));

    toast({
      type: "success",
      title: "Task Modified Successfully!",
      description: "The new iformation is now available!",
    });

    closeModal();
  };

  const markAsComplete = async () => {
    if (task.status === "done") return;
    setLoading(true);
    await modifyTask(task.id, {
      status: "done",
    })
      .catch((err) => {
        toast({
          type: "error",
          title: "Error modifying task.",
          description: err.message ?? "Unkonw error.",
        });
      })
      .finally(() => {
        setLoading(false);
      });

    toast({
      type: "success",
      title: "Task Completed Successfully!",
      description: "The task has now been marked as completed!",
    });

    closeModal();
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-auto scrollbar-primary lg:px-8 lg:py-6 pb-12">
      {loading ? (
        <LoaderSpinner message="Saving changes ..." />
      ) : (
        <>
          <div className="w-full flex flex-col lg:w-[65%] space-y-5 p-6">
            <h2 className="my-5 text-black font-semibold text-2xl text-left">
              {task.title}
            </h2>
            <div className="flex gap-4 flex-wrap">
              <TaskStatusPill status={task.status} />
              <PriorityPill priority={task.priority} />
              <DueDatePill date={task.due_date} />
            </div>
            <div className="flex gap-4 flex-wrap mt-2">
              <TaskActionButton
                onClick={markAsComplete}
                text={task.status === "done" ? "Completed" : "Mark Complete"}
                icon={Check}
              />
              <TaskActionButton text="Attach" icon={Clipboard} />
              <TaskActionButton text="Share" icon={Share} />
            </div>
            <div className="my-2 w-[85%]">
              <ProgressBar
                progress={getTaskProgress(subtasks ?? task.subtasks).progress}
              />
            </div>
            <div className="flex flex-col space-y-4 mt-4">
              <div className="flex space-x-3 items-center">
                <Text className="size-3.5 text-gray-600" />
                <span className="uppercase text-black text-sm">
                  Description
                </span>
              </div>
              <p className="text-sm text-gray-600 px-3">{task.description}</p>
            </div>
            <div className="flex flex-col space-y-4 mt-4 relative">
              <div className="flex items-center space-x-2">
                <ListChecks className="size-3.5 text-gray-600" />
                <span className="uppercase text-black text-sm">Subtasks</span>
              </div>
              <div className="flex flex-col space-y-2 px-5 overflow-auto scrollbar-primary max-h-[180px]">
                {subtasks.map((subtask, index) => (
                  <SubTaskRow
                    onClick={onSubtaskStatusChange}
                    key={index}
                    subtask={subtask}
                  />
                ))}
              </div>

              <button
                disabled={showAddSubtask}
                onClick={() => setShowAddSubtask(true)}
                className="cursor-pointer flex space-x-2 items-center text-gray-600 text-sm mt-2"
              >
                <Plus className="size-4" />
                <span>Add Subtask</span>
              </button>

              <div
                ref={subtaskWindowRef}
                className={`
                      absolute
                      z-50
                      left-0
                      bottom-1/6
                      mt-2
                      w-[330px]
                      md:w-[400px]
                      max-h-[260px]`}
              >
                {showAddSubtask && (
                  <CreateSubtaskWindow
                    setSubtasks={setSubtasks}
                    onClose={() => setShowAddSubtask(false)}
                    project={project}
                    task={task}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col lg:w-[35%] p-6">
            <div className="flex space-x-3 items-center">
              <Sparkles className="text-primary size-4" />
              <h3 className="text-base text-primary font-medium">
                TaskGenius AI Insights
              </h3>
            </div>

            <div className="flex flex-col mt-5 px-2 space-y-6">
              <SelectOptions
                label="Task Status"
                placeholder={resolveTaskStatus(task.status)}
                value={statusLabel}
                setValue={setStatusLabel}
                data={Object.values(TASK_STATUS_LABELS)}
              />
              <SelectOptions
                label="Task Priority"
                placeholder={resolveTaskPriority(task.priority)}
                value={priorityLabel}
                setValue={setPriorityLabel}
                data={Object.values(TASK_PRIORITY_LABELS)}
              />

              <div className="flex flex-col space-y-3 relative">
                <span className="font-medium text-sm">Assigned to</span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-[25px] h-[25px]">
                      <Image
                        className="rounded-full"
                        fill
                        src={currentlyAssigned.image_url}
                        alt="Assigned"
                      />
                    </div>
                    <span className="font-medium text-sm text-gray-600">
                      {currentlyAssigned.name}
                    </span>
                  </div>
                  {project.members.length > 0 && (
                    <button
                      disabled={showAssign}
                      onClick={() => setShowAssign(true)}
                      className="cursor-pointer py-1.5 px-3 text-primary bg-primary/20 font-semibold rounded-md text-xs"
                    >
                      Assign
                    </button>
                  )}
                </div>

                {showAssign && (
                  <div
                    ref={assignWindowRef}
                    className="
                      absolute
                      z-50
                      right-0
                      top-full
                      mt-2
                      w-[370px]
                      md:w-[400px]
                      max-h-[260px]
                      overflow-auto
                      rounded-xl
                      border border-gray-200
                      bg-white
                      shadow-lg
                      no-scrollbar
                    "
                  >
                    <AssignTaskUsersList
                      onClose={() => setShowAssign(false)}
                      type="window"
                      task={task}
                      project={project}
                      setCurrentUser={setCurrentlyAssigned}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="font-medium text-sm">Due Date</span>
                <span className="text-sm text-gray-600">
                  {formatDateDDMMYY(task.due_date)}
                </span>
              </div>

              <div className="mt-2 flex flex-col space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Created</span>
                  <span>{formatDateDDMMYY(task.created_at)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Updated</span>
                  <span>{formatDateDDMMYY(task.updated_at)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ID</span>
                  <span>TASK-392</span>
                </div>
              </div>
              <div className="mt-5">
                <CreatProjectModalActionButtons
                  cancelText="Cancel"
                  confirmText="Save Changes"
                  handleCancelClick={closeModal}
                  handleConfirmClick={handleModifyTask}
                  disabled={!hasChanges}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskModal;

function TaskActionButton({
  text,
  icon: Icon,
  onClick,
}: {
  onClick?: () => void;
  text: string;
  icon: LucideIcon;
}) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-primary/10 transition-all duration-300 cursor-pointer py-1 px-3 border border-primary/50 flex items-center space-x-1 rounded-xl text-xs"
    >
      <Icon className="size-4 text-primary border p-0.5 border-gray-300 rounded-full" />
      <span className="text-primary">{text}</span>
    </button>
  );
}

function SubTaskRow({
  subtask,
  onClick,
}: {
  subtask: Subtask;
  onClick: (id: string, status: TaskStatus) => void;
}) {
  const completed = subtask.status === "done";

  const toggle = () => {
    onClick(
      subtask.id,
      completed ? ("todo" as TaskStatus) : ("done" as TaskStatus)
    );
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`flex space-x-3 items-center relative w-max text-left ${
        completed ? "text-gray-600" : "text-gray-500"
      }`}
    >
      {completed ? (
        <CheckSquare className="size-4 text-primary" />
      ) : (
        <Bookmark className="size-4 text-black" />
      )}

      <p>{subtask.description}</p>

      {completed && (
        <div className="absolute top-[53%] w-full bg-gray-600 h-px" />
      )}
    </button>
  );
}

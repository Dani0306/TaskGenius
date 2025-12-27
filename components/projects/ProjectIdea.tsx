"use client";

import { AIProjectIdea, Project, Task, TaskStatus } from "@/types";
import CreatProjectModalActionButtons from "./CreatProjectModalActionButtons";
import { useModal } from "@/providers/context/AppModalProvider";
import { createProject } from "@/actions/projects";
import { getDueDate } from "@/lib/utils";
import { createBrowserSupabase } from "@/utils/supabase/client";
import { createTask } from "@/actions/tasks";
import { useState } from "react";
import { useToast } from "@/providers/toast/ToastProvider";
import LoaderSpinner from "../shared/loader/LoaderSpinner";
import { createSubTasks } from "@/actions/subtasks/createSubtask";

const ProjectIdea = ({
  projectIdea,
  onRetry,
}: {
  projectIdea: AIProjectIdea;
  onRetry: () => void;
}) => {
  const { closeModal } = useModal();
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const supabase = createBrowserSupabase();

  const handleCreateProject = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const project: Project = await createProject({
      user_id: user?.id ?? "",
      name: projectIdea.title,
      description: projectIdea.description,
      due_date: projectIdea.due_date ?? getDueDate(projectIdea.timeframe),
      category: projectIdea.category,
      status: "active",
    });

    const tasks = projectIdea.tasks.map((task) => ({
      project_id: project.id,
      user: user?.id ?? "",
      title: task.title,
      description: task.description,
      priority: task.priority,
      due_date: new Date(task.due_date),
    }));

    const createdTasks = (await createTask(tasks).catch((err) => {
      toast({
        type: "error",
        title: "Error while adding project members.",
        description: err.message ?? "Unknown error",
      });
    })) as Task[];

    const subtasksToInsert = createdTasks.flatMap((createdTask, index) => {
      const aiTask = projectIdea.tasks[index];

      return aiTask.subtasks.map((subtask) => ({
        task_id: createdTask.id,
        description: subtask.description,
        status: subtask.status as TaskStatus, // "todo" | "done"
        project_id: project.id,
      }));
    });

    await createSubTasks(subtasksToInsert)
      .catch((err) => {
        toast({
          type: "error",
          title: "Error while adding project members.",
          description: err.message ?? "Unknown error",
        });
      })
      .finally(() => setLoading(false));

    closeModal();
    toast({
      type: "success",
      title: "Project Successfully Created!",
      description: "Your project is now available in your projects section!",
    });
  };

  return (
    <div className="w-full h-full flex items-center flex-col space-y-5 px-2">
      {loading ? (
        <LoaderSpinner message="Creating Project ..." />
      ) : (
        <>
          <h2 className="text-center text-3xl font-semibold text-black">
            {projectIdea.title}
          </h2>
          <p className="text-center">{projectIdea.description}</p>

          <strong className="text-black font-medium">Generated Tasks</strong>
          <div className="flex flex-col space-y-4">
            {projectIdea.tasks.map((task, index) => (
              <div
                key={task.title}
                className="rounded-xl shadow-xl bg-white flex flex-col space-y-2 p-5"
              >
                <span className="text-primary">Task {index + 1}: </span>
                <strong className="font-semibold text-black text-sm">
                  {task.title}
                </strong>
                <p className="text-gray-700 text-sm">{task.description}</p>
                <strong className="text-sm">Due {task.due_date}</strong>
                <strong className="text-sm">Priority: {task.priority}</strong>
              </div>
            ))}
          </div>
          <div className="mb-14 w-full">
            <CreatProjectModalActionButtons
              cancelText="Generate Again"
              handleCancelClick={onRetry}
              confirmText="Create Project"
              handleConfirmClick={handleCreateProject}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectIdea;

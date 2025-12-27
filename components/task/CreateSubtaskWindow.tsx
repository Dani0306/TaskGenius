import React, { useEffect, useRef, useState } from "react";
import InputField from "../projects/InputField";
import { X } from "lucide-react";
import { Project, Subtask, Task, TaskStatus } from "@/types";
import { createSubTasks } from "@/actions/subtasks/createSubtask";
import { useToast } from "@/providers/toast/ToastProvider";

const CreateSubtaskWindow = ({
  onClose,
  setSubtasks,
  project,
  task,
}: {
  onClose: () => void;
  setSubtasks: React.Dispatch<React.SetStateAction<Subtask[]>>;
  project: Project;
  task: Task;
}) => {
  const [description, setDescription] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleCreateSubtask = async () => {
    if (!description) return;
    setLoading(true);
    const subtask = {
      task_id: task.id,
      project_id: project.id,
      description,
      status: "todo" as TaskStatus,
    };

    const createdSubtasks = await createSubTasks([subtask])
      .catch((err) => {
        toast({
          title: "Error creating subtask",
          description: err.message ?? "unkown error",
          type: "error",
        });
      })
      .finally(() => setLoading(false));

    setSubtasks((prev) => [...prev, ...(createdSubtasks as Subtask[])]);
    onClose();
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white rounded-xl border shadow-xl relative">
      {loading ? (
        <span className="font-medium text-gray-600 text-sm">
          Adding subtask ...
        </span>
      ) : (
        <>
          <X
            onClick={onClose}
            className="cursor-pointer size-4 text-gray-600 top-4 right-4 absolute"
          />
          <span className="text-sm text-black font-medium">Create subtask</span>
          <InputField
            ref={ref}
            size="sm"
            value={description}
            setValue={setDescription}
            type="text"
            placeholder="Type the subtask description"
            name="description"
          />
          <button
            disabled={!description}
            onClick={handleCreateSubtask}
            className="w-max cursor-pointer py-2 px-8 text-white bg-primary font-semibold rounded-md text-xs disabled:opacity-40"
          >
            Add
          </button>
        </>
      )}
    </div>
  );
};

export default CreateSubtaskWindow;

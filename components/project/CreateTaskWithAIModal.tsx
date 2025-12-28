import { Project, Subtask, SubtaskToInsert, Task, TaskToInsert } from "@/types";
import { User } from "@supabase/supabase-js";
import React, { useState } from "react";
import SelectOptions from "../shared/select/SelectOptions";
import { TIMEFRAME_LABELS } from "@/constants/project/timeFrames";
import InputField from "../projects/InputField";
import CreatProjectModalActionButtons from "../projects/CreatProjectModalActionButtons";
import { useModal } from "@/providers/context/AppModalProvider";
import { Sparkles } from "lucide-react";
import { generateTaskPrompt } from "@/lib/prompts/generateTaskPrompt";
import { getDueDate } from "@/lib/utils";
import { AIGenerate } from "@/actions/ai/generate";
import { createTask } from "@/actions/tasks";
import { createSubTasks } from "@/actions/subtasks/createSubtask";
import { useToast } from "@/providers/toast/ToastProvider";
import LoaderSpinner from "../shared/loader/LoaderSpinner";

const CreateTaskWithAIModal = ({
  project,
  user,
}: {
  project: Project;
  user: User;
}) => {
  const { closeModal } = useModal();
  const { toast } = useToast();

  const [priority, setPriority] = useState<string>("");
  const [complexity, setComplexity] = useState<string>("");
  const [taskSize, setTaskSize] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [section, setSection] = useState<number>(1);
  const [constraints, setConstraints] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateTask = async () => {
    try {
      setLoading(true);

      const prompt = generateTaskPrompt({
        priority,
        complexity,
        taskSize,
        goal,
        constraints,
        project,
        dueDate: String(getDueDate(dueDate)),
      });

      const taskIdea = JSON.parse(await AIGenerate(prompt)) as Task;

      // 1) create task (WITHOUT subtasks)
      const { subtasks = [], ...taskToInsert } = taskIdea;

      const [createdTask] = (await createTask([
        { ...taskToInsert, project_id: project.id, user: user.id },
      ] as TaskToInsert[])) as Task[];

      // 2) create subtasks (FROM AI, attach IDs)
      const subtasksToInsert: SubtaskToInsert[] = subtasks.map((s) => ({
        task_id: createdTask.id,
        project_id: project.id,
        description: s.description,
        status: s.status, // should be "todo"
      }));

      if (subtasksToInsert.length) {
        await createSubTasks(subtasksToInsert);
      }

      toast({
        type: "success",
        title: "Task created successfully!",
        description: "The new task is now available in your project.",
      });

      closeModal();
      // eslint-disable-next-line
    } catch (err: any) {
      toast({
        type: "error",
        title: "Error creating task.",
        description: err.message ?? "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col space-y-6 items-center mt-12">
      {!loading ? (
        <>
          <h2 className="text-2xl lg:text-3xl font-semibold text-black text-center">
            Let AI generate your task.
          </h2>
          <p className="text-gray-600 text-sm text-center px-2 max-w-[600px] mx-auto">
            With this option, you&apos;ll let AI generate a task based on your
            project&apos;s needs, including a clear objective, suggested
            priority, and actionable subtasks.
          </p>
          <div className="w-[90%] lg:w-[75%] flex flex-col space-y-4">
            {section === 1 ? (
              <>
                <InputField
                  label="Task goal"
                  placeholder="What do you want to achieve?"
                  name="goal"
                  value={goal}
                  setValue={setGoal}
                  type="text"
                  textArea
                />
                <SelectOptions
                  placeholder="What is the due date for this task?"
                  label="Due Date"
                  data={TIMEFRAME_LABELS}
                  value={dueDate}
                  setValue={setDueDate}
                />
                <SelectOptions
                  placeholder="Is this task urgent?"
                  label="Task priority"
                  data={["Low", "Medium", "Urgent"]}
                  value={priority}
                  setValue={setPriority}
                />
                <CreatProjectModalActionButtons
                  confirmText="Next"
                  cancelText="Cancel"
                  handleCancelClick={closeModal}
                  handleConfirmClick={() => setSection(2)}
                />
              </>
            ) : (
              <>
                <InputField
                  type="text"
                  label="Any constraints or preferences?"
                  placeholder="Tools, limitations, style, dependencies…"
                  name="constraints"
                  textArea
                  value={constraints}
                  setValue={setConstraints}
                />
                <SelectOptions
                  placeholder="How complex is this task?"
                  label="Task complexity"
                  data={["Simple", "Moderate", "Complex"]}
                  value={complexity}
                  setValue={setComplexity}
                />
                <SelectOptions
                  placeholder="Do you want fewer or more subtasks?"
                  label="Task Size"
                  data={["More", "Fewer"]}
                  value={taskSize}
                  setValue={setTaskSize}
                />
                <CreatProjectModalActionButtons
                  confirmText="Generate Task"
                  icon={Sparkles}
                  cancelText="Back"
                  handleCancelClick={() => setSection(1)}
                  handleConfirmClick={generateTask}
                />
              </>
            )}
          </div>
        </>
      ) : (
        <LoaderSpinner message="Generating your task ..." />
      )}
    </div>
  );
};

export default CreateTaskWithAIModal;

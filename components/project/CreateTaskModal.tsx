import { useState } from "react";
import AppLogoLanding from "../shared/AppLogoLanding";
import InputField from "../projects/InputField";
import CreatProjectModalActionButtons from "../projects/CreatProjectModalActionButtons";
import { useModal } from "@/providers/context/AppModalProvider";
import DatePicker from "../shared/datePicker/DatePicker";
import SelectOptions from "../shared/select/SelectOptions";
import { Project } from "@/types";
import { createTask } from "@/actions/tasks";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/providers/toast/ToastProvider";
import LoaderSpinner from "../shared/loader/LoaderSpinner";

const TASK_PRIORITIES = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

const CreateTaskModal = ({
  project,
  user,
}: {
  project: Project;
  user: User;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [due_date, setDue_date] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { closeModal } = useModal();
  const { toast } = useToast();

  const handleCreateTask = async () => {
    setLoading(true);
    await createTask([
      {
        title,
        description,
        priority:
          TASK_PRIORITIES.find((i) => i.label === priority)?.value ?? "low",
        due_date: due_date!,
        project_id: project.id,
        user: user.id,
      },
    ])
      .catch((err) => {
        toast({
          title: "Error creating task.",
          description: err.message ?? "Unkown Error",
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });

    toast({
      type: "success",
      title: "Task created successfully!",
      description: "Your taask is now available in the project tasks section!",
    });

    closeModal();
  };

  return (
    <div className="flex flex-col space-y-4 items-center mt-8 w-full h-full">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center -mt-14">
          <LoaderSpinner message="Creating task ..." />
        </div>
      ) : (
        <>
          <AppLogoLanding size="sm" />
          <h2 className="text-2xl lg:text-3xl font-semibold text-black">
            Create A New Task
          </h2>
          <div className="w-[90%] lg:w-[70%] flex flex-col space-y-4 mt-8">
            <InputField
              value={title}
              setValue={setTitle}
              label="Task title"
              placeholder="What do you need to do?"
              type="text"
              name="title"
            />
            <InputField
              textArea
              value={description}
              setValue={setDescription}
              label="Task Description"
              placeholder="Describe your task."
              type="text"
              name="description"
            />
            <DatePicker date={due_date} setDate={setDue_date} />
            <SelectOptions
              placeholder="Give this task a priority"
              label="Task Priority"
              value={priority}
              setValue={setPriority}
              data={TASK_PRIORITIES.map((i) => i.label)}
            />
            <CreatProjectModalActionButtons
              disabled={!title || !description || !priority || !due_date}
              confirmText="Create Task"
              handleConfirmClick={handleCreateTask}
              handleCancelClick={closeModal}
              cancelText="Cancel"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateTaskModal;

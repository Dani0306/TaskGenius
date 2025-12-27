"use client";

import { useState } from "react";
import InputField from "./InputField";
import DatePicker from "../shared/datePicker/DatePicker";
import { useModal } from "@/providers/context/AppModalProvider";
import { Project, ProjectCategory } from "@/types";
import CreatProjectModalActionButtons from "./CreatProjectModalActionButtons";
import ProjectCategories from "./ProjectCategories";
import { createProject } from "@/actions/projects";
import { createBrowserSupabase } from "@/utils/supabase/client";
import { isPast } from "date-fns";
import { useToast } from "@/providers/toast/ToastProvider";
import LoaderSpinner from "../shared/loader/LoaderSpinner";
import AppLogoLanding from "../shared/AppLogoLanding";

const CreateProjectModal = () => {
  const { closeModal } = useModal();
  const supabase = createBrowserSupabase();
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [section, setSection] = useState<number>(1);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | undefined
  >(undefined);

  const submitProject = async () => {
    setLoading(true);
    const { data: user, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);

    const createdProject: Project = await createProject({
      user_id: user.user.id,
      name,
      description,
      status: "active",
      category: selectedCategory!,
      due_date: dueDate!,
    }).catch((e) => {
      toast({
        type: "error",
        title: "Error while creating the project",
        description: e.message ?? "Unknown error",
      });
    });

    closeModal();

    toast({
      type: "success",
      title: "Project Successfully Created!",
      description: "Your project is now available in your projects section!",
    });

    return createdProject;
  };

  return (
    <div className="flex flex-col w-full h-full overflow-auto no-scrollbar">
      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
          <LoaderSpinner message="Creating project ..." />
        </div>
      ) : (
        <div className="flex flex-col space-y-4 items-center mt-8">
          <AppLogoLanding size="sm" />
          <h2 className="text-2xl lg:text-3xl font-semibold text-black">
            Create A New Project
          </h2>

          {section === 1 ? (
            <div className="w-full mt-6">
              <div className="mx-auto flex flex-col space-y-7 w-[90%] lg:w-[70%]">
                <InputField
                  name="name"
                  label="Project Name"
                  placeholder="Enter the project name"
                  value={name}
                  setValue={setName}
                  type="text"
                />
                <InputField
                  name="description"
                  label="Description (Optional)"
                  placeholder="Enter the project description"
                  value={description}
                  setValue={setDescription}
                  type="text"
                  textArea
                />
                <DatePicker date={dueDate} setDate={setDueDate} />
                <CreatProjectModalActionButtons
                  confirmText="Next"
                  cancelText="Cancel"
                  handleConfirmClick={() => setSection(2)}
                  handleCancelClick={closeModal}
                  disabled={!name || !dueDate || isPast(dueDate)}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="mx-auto w-[95%] lg:w-[70%] flex flex-col mt-8 px-6">
                <strong className="font-medium">
                  Choose The Project&apos;s Category
                </strong>
                <ProjectCategories
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                />
              </div>
              <div className="mt-6 mx-auto w-[90%] md:w-[70%] mb-12">
                <CreatProjectModalActionButtons
                  confirmText="Create Project"
                  cancelText="Back"
                  handleConfirmClick={submitProject}
                  handleCancelClick={() => setSection(1)}
                  disabled={!selectedCategory}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateProjectModal;

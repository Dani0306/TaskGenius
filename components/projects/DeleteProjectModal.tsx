"use client";

import InputField from "./InputField";
import { Project } from "@/types";
import { useToast } from "@/providers/toast/ToastProvider";
import { deleteProject } from "@/actions/projects";
import { useState } from "react";
import { useModal } from "@/providers/context/AppModalProvider";
import LoaderSpinner from "../shared/loader/LoaderSpinner";
import DeleteButton from "../shared/DeleteButton";
import { useRouter } from "next/navigation";

const DeleteProjectModal = ({ project }: { project: Project }) => {
  const [query, setQuery] = useState<string>("");
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { closeModal } = useModal();

  const deleteProjectFn = async () => {
    setLoading(true);
    if (query === project.name) {
      await deleteProject(project.id)
        .catch((err) => {
          toast({
            title: "Error while deleting project.",
            description: err.message ?? "Unkown error.",
            type: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
      toast({
        title: "Project deleted successfully!",
        description: "This project will no longer be part of task list.",
        type: "success",
      });
      router.push("/app/projects?status=active");
      closeModal();
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-14 justify-center space-y-4 px-7">
      {loading ? (
        <div className="mt-14 flex flex-col items-center justify-center space-y-6">
          <LoaderSpinner message="Deleting project ..." />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-black text-center">
            Are you sure want to delete the project{" "}
            <strong className="text-red-700 font-medium">{project.name}</strong>
            ?
          </h2>
          <p className="text-sm text-gray-700 text-center">
            This action can not be undone, to proceed please type the project
            name below.
          </p>
          <div className="mx-auto w-full">
            <InputField
              name="project"
              value={query}
              setValue={setQuery}
              placeholder={project.name}
              type="text"
            />
          </div>
          <DeleteButton
            text="Delete Project"
            onClick={deleteProjectFn}
            disabled={query !== project.name}
          />
        </>
      )}
    </div>
  );
};

export default DeleteProjectModal;

"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CATEGORY_META } from "@/constants/project/categories";
import { getProjectProgress } from "@/lib/utils";
import { Project } from "@/types";
import { Ellipsis } from "lucide-react";
import ProjectStatusPill from "./ProjectStatusPill";
import { DueDatePill } from "./DueDatePill";
import { useModal } from "@/providers/context/AppModalProvider";
import ModalContainer from "../modal/ModalContainer";
import DeleteProjectModal from "../projects/DeleteProjectModal";
import { useRouter } from "next/navigation";
import ProjectIconPill from "./ProjectIconPill";
import ProgressBar from "./ProgressBar";

const ProjectCard = ({ project }: { project: Project }) => {
  const meta = CATEGORY_META[project.category];
  const { progress, completed, todo } = getProjectProgress(project);

  const { openModal } = useModal();

  const router = useRouter();

  const deleteProjectModal = () => {
    openModal(
      <ModalContainer size="xs">
        <DeleteProjectModal project={project} />
      </ModalContainer>
    );
  };

  const navigate = () => {
    router.push(`/app/project/${project.id}`);
  };

  return (
    <div
      onClick={navigate}
      key={project.id}
      className="w-full flex flex-col bg-white space-y-5 p-6 rounded-xl shadow-xl cursor-pointer hover:scale-[1.02] transition-all duration-500"
    >
      <div className="w-full flex items-center justify-between">
        <ProjectIconPill icon={meta.icon} meta={meta} />
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Ellipsis className="text-black size-4.5 " />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Project Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={deleteProjectModal}
              className="cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Members
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <strong className="font-bold text-black text-xl">{project.name}</strong>
      <div className="flex flex-col space-y-3 items-start space-x-4 rounded-xl border border-[#E4DDFF] dark:border-violet-900/60 bg-[#F0ECFF] dark:bg-violet-900/20 p-4">
        <span className="text-base font-semibold text-purple-500 dark:text-purple-400 mt-0.5">
          Info
        </span>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          {project.description}
        </p>
      </div>
      <DueDatePill date={String(project.due_date)} />
      <div className="flex flex-col">
        <ProgressBar progress={progress} />

        {project.members.length > 0 && (
          <span className="my-3 text-sm text-gray-600">
            {project.members.length}{" "}
            {project.members.length === 1 ? "Member" : "Members"}.
          </span>
        )}

        <div className="flex space-x-4 justify-between w-full mt-3">
          <span className="text-sm text-gray-600">
            {completed}/{todo} Tasks Completed
          </span>
          <ProjectStatusPill size="sm" status={project.status} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

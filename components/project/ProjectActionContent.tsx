"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, Ellipsis } from "lucide-react";
import ModalContainer from "../modal/ModalContainer";
import DeleteProjectModal from "../projects/DeleteProjectModal";
import { Project } from "@/types";
import { useModal } from "@/providers/context/AppModalProvider";

const ProjectActionContent = ({ project }: { project: Project }) => {
  const { openModal } = useModal();

  const deleteProject = async () => {
    openModal(
      <ModalContainer size="xs">
        <DeleteProjectModal project={project} />
      </ModalContainer>
    );
  };
  return (
    <div className="flex items-center lg:justify-center mt-6 lg:mt-0 space-x-2">
      <Edit className="bg-primary/20 text-primary rounded-full p-2.5 size-10 cursor-pointer" />
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <Ellipsis className="bg-primary/20 text-primary rounded-full p-2.5 size-10 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Project Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={deleteProject} className="cursor-pointer">
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Members
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            View Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProjectActionContent;

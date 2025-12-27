"use client";

import { useModal } from "@/providers/context/AppModalProvider";
import { Project } from "@/types";
import { Plus } from "lucide-react";
import Image from "next/image";
import ModalContainer from "../modal/ModalContainer";
import AddMembersModal from "./AddMembersModal";
import { User } from "@supabase/supabase-js";

const ProjectMembersPreview = ({
  project,
  user,
}: {
  project: Project;
  user: User;
}) => {
  const membersToDisplay = project.members.slice(0, 3);

  const { openModal } = useModal();

  const addMembers = () => {
    openModal(
      <ModalContainer size="md">
        <AddMembersModal project={project} />
      </ModalContainer>
    );
  };

  return (
    <div className="flex items-center lg:justify-center">
      {membersToDisplay.map((member, index) => (
        <div
          key={member.email}
          className={`w-[25px] h-[25px] relative ${index !== 0 && "-ml-2"}`}
        >
          <Image
            src={member.image_url}
            fill
            className="rounded-full"
            alt="Member picture"
          />
        </div>
      ))}
      {project.user_id === user.id && (
        <Plus
          onClick={addMembers}
          className="rounded-full p-1 size-6.5 bg-gray-300 text-gray-800 ml-[-5px] cursor-pointer"
        />
      )}
      {project.members.length > 3 && (
        <span className="mx-3 text-sm text-gray-600">
          and {project.members.length - 3}{" "}
          {project.members.length - 3 === 1 ? "Other" : "Others"} ...
        </span>
      )}
    </div>
  );
};

export default ProjectMembersPreview;

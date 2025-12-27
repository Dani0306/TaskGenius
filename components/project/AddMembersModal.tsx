import React, { useState } from "react";
import AddMembers from "../projects/AddMembers";
import { AppUser, Project } from "@/types";
import CreatProjectModalActionButtons from "../projects/CreatProjectModalActionButtons";
import { useModal } from "@/providers/context/AppModalProvider";
import { addMembers } from "@/actions/projects/addMembers";
import { useToast } from "@/providers/toast/ToastProvider";
import LoaderSpinner from "../shared/loader/LoaderSpinner";

const AddMembersModal = ({ project }: { project: Project }) => {
  const [members, setMembers] = useState<string[]>(
    project.members.map((member) => member.user_id!)
  );
  const [currentlyAddedMembers, setCurrentlyAddedMembers] = useState<AppUser[]>(
    []
  );

  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const { closeModal } = useModal();

  const handleAddMembers = async () => {
    setLoading(true);

    const newMemberIds = currentlyAddedMembers.map((m) => m.user_id!);

    try {
      await addMembers(project.id, newMemberIds);

      toast({
        title: "Members added successfully!",
        description: "They are now part of your project!",
        type: "success",
      });

      closeModal();
      // eslint-disable-next-line
    } catch (e: any) {
      toast({
        title: "Error adding members",
        description: e.message ?? "Unknown error.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] md:w-[80%] mx-auto h-full flex flex-col items-center justify-between py-12">
      {loading ? (
        <LoaderSpinner message="Adding members ..." />
      ) : (
        <>
          <AddMembers
            members={members}
            setMembers={setMembers}
            currentlyAddedMembers={currentlyAddedMembers}
            setCurrentlyAddedMembers={setCurrentlyAddedMembers}
          />
          <CreatProjectModalActionButtons
            cancelText="Cancel"
            handleCancelClick={closeModal}
            confirmText="Add members"
            handleConfirmClick={handleAddMembers}
            disabled={currentlyAddedMembers.length === 0}
          />
        </>
      )}
    </div>
  );
};

export default AddMembersModal;

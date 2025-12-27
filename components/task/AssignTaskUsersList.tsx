import { useEffect, useRef, useState } from "react";
import InputField from "../projects/InputField";
import { useDebounce } from "@/hooks/debouncer/useDebounce";
import { AppUser, Project, Task } from "@/types";
import { filterData } from "@/lib/utils";
import Image from "next/image";
import { modifyTask } from "@/actions/tasks";
import { useToast } from "@/providers/toast/ToastProvider";
import { useModal } from "@/providers/context/AppModalProvider";
import LoaderSpinner from "../shared/loader/LoaderSpinner";

const AssignTaskUsersList = ({
  project,
  task,
  type = "modal",
  setCurrentUser,
  onClose,
}: {
  project: Project;
  task: Task;
  type?: "modal" | "window";
  setCurrentUser?: React.Dispatch<React.SetStateAction<AppUser>>;
  onClose?: () => void;
}) => {
  const { query, setQuery, value } = useDebounce();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { closeModal } = useModal();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const users = filterData({
    data: project.members,
    q: value,
    accessors: [(s) => s.name, (s) => s.email],
  });

  const handleAssign = async (userId: string) => {
    setLoading(true);
    await modifyTask(task.id, { user: userId })
      .catch((err) => {
        toast({
          type: "error",
          title: "Error assigning taks.",
          description: err.message ?? "Unkown error.",
        });
      })
      .finally(() => setLoading(false));

    toast({
      type: "success",
      title: "Task has been assigned successfully!",
    });

    if (type === "window" && setCurrentUser && onClose) {
      const user = users.find((user) => user.user_id === userId)!;
      setCurrentUser(user);
      onClose();
    }

    if (type === "modal") closeModal();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={`${
        type === "window" && "bg-white p-6 rounded-xl"
      } space-y-4 flex flex-col`}
    >
      {loading ? (
        <LoaderSpinner message="Assignning task ..." />
      ) : (
        <>
          <InputField
            ref={inputRef}
            type="text"
            placeholder="Search by name or email"
            name="members"
            value={query}
            setValue={setQuery}
          />

          <span className="text-black font-medium self-start mt-5 text-sm">
            Project Members
          </span>

          {users.length > 0 ? (
            <div className="w-full flex flex-col space-y-1.5 overflow-auto scrollbar-primary mt-3 max-h-[300px]">
              {users.map((user) => (
                <div
                  key={user.user_id}
                  className="w-full flex space-x-4 py-2 px-4 bg-white border border-gray-300 items-center rounded-md justify-between"
                >
                  <div className="flex space-x-3 items-center">
                    <div className="w-[25px] h-[25px] relative">
                      <Image
                        fill
                        src={user.image_url}
                        alt="Profile"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{user.name}</span>
                      <span className="text-xs text-gray-500">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAssign(user.user_id!)}
                    className="cursor-pointer py-1.5 px-3 text-primary bg-primary/20 font-semibold rounded-md text-xs"
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-sm font-medium text-gray-500">
              No users found.
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default AssignTaskUsersList;

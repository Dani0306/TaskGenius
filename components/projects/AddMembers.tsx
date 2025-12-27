import { useDebounce } from "@/hooks/debouncer/useDebounce";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import { AppUser } from "@/types";
import { fetchUsers } from "@/actions/user/fetchUsers";
import Image from "next/image";
import { X } from "lucide-react";

const AddMembers = ({
  setMembers,
  members,
  currentlyAddedMembers,
  setCurrentlyAddedMembers,
}: {
  members: string[];
  setMembers: React.Dispatch<React.SetStateAction<string[]>>;
  currentlyAddedMembers: AppUser[];
  setCurrentlyAddedMembers: React.Dispatch<React.SetStateAction<AppUser[]>>;
}) => {
  const { query, setQuery, value } = useDebounce();
  const [usersAvailable, setUsersAvailable] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (value === "") {
        // eslint-disable-next-line
        setUsersAvailable([]);
      }
    }

    const getUsers = async () => {
      setLoading(true);
      const users: AppUser[] = await fetchUsers(value).finally(() => {
        setLoading(false);
      });
      if (isMounted) {
        setUsersAvailable([
          ...users.filter((item) => !members.includes(item.user_id!)),
        ]);
      }
    };

    if (value) {
      getUsers();
    }

    return () => {
      isMounted = false;
    };
  }, [value, members]);

  const setMembersToAdd = (member: string, user: AppUser) => {
    setMembers((prev) => [...prev, member]);
    setCurrentlyAddedMembers((prev) => [...prev, user]);
    setUsersAvailable([]);
    setQuery("");
  };

  const deleteMembersToAdd = (member: string, user: AppUser) => {
    setMembers((prev) => [...prev.filter((item) => item !== member)]);
    setCurrentlyAddedMembers((prev) => [
      ...prev.filter((item) => item.user_id !== user.user_id),
    ]);
  };

  return (
    <div className="mx-auto w-full flex flex-col">
      <h2 className="my-5 text-black font-semibold text-2xl">
        Add Project Members
      </h2>
      <InputField
        type="text"
        placeholder="Search by name or email"
        name="members"
        value={query}
        setValue={setQuery}
      />

      <div className="mx-auto w-full rounded-xl flex flex-col mt-3 relative">
        {usersAvailable.map((user) => (
          <div
            key={user.user_id}
            className="w-full flex space-x-4 py-2 px-4 bg-white border border-gray-300 items-center rounded-md justify-between absolute"
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
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
            </div>
            <button
              onClick={() => setMembersToAdd(user.user_id!, user)}
              className="cursor-pointer py-1.5 px-3 text-primary bg-primary/20 font-semibold rounded-md text-xs"
            >
              Add
            </button>
          </div>
        ))}
        {value !== "" && usersAvailable.length === 0 && !loading && (
          <span className="text-sm">No Users Found.</span>
        )}
        {loading && <span className="text-sm">Searching users ...</span>}
        {currentlyAddedMembers.length > 0 && (
          <span className="font-medium text-sm mt-3">
            Currently Selected Members
          </span>
        )}
        <div className="flex flex-wrap gap-3 mt-3">
          {currentlyAddedMembers.map((user) => (
            <div
              key={user.user_id}
              className="py-1.5 px-4 bg-primary/10 text-primary font-semibold flex space-x-4 items-center text-sm rounded-xl"
            >
              <div className="w-[25px] h-[25px] relative">
                <Image
                  src={user.image_url}
                  fill
                  alt="User profile"
                  className="rounded-full"
                />
              </div>
              <span>{user.name}</span>
              <X
                onClick={() => deleteMembersToAdd(user.user_id!, user)}
                className="size-4 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddMembers;

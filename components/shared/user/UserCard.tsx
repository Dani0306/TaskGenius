import { User } from "@supabase/supabase-js";
import Image from "next/image";
import PlanPill from "./PlanPill";

const UserCard = ({
  user,
  onClick,
}: {
  user: User | null;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="flex space-x-2 items-center cursor-pointer"
    >
      <div className="w-[35px] h-[35px] relative">
        <Image
          className="rounded-full"
          fill
          objectFit="contain"
          src={user?.user_metadata?.avatar_url}
          alt="user avatar"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <strong className="font-semibold text-sm text-black">
            {user?.user_metadata.full_name}
          </strong>
          <PlanPill plan="pro" size="sm" />
        </div>
        <span className="text-xs">{user?.email}</span>
      </div>
    </div>
  );
};

export default UserCard;

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFilters } from "@/hooks/filters/useFilters";
import { User } from "@supabase/supabase-js";

const FilterButton = ({
  value,
  label,
  options,
  user,
}: {
  value: string;
  label: string;
  options: Array<{ label: string; option: string }>;
  user: User;
}) => {
  const { handleFilter } = useFilters();

  const handleClick = (value: string, option: string) => {
    if (value === "assigned") {
      handleFilter({ type: value, value: user.id });
    } else {
      handleFilter({ type: value, value: option });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <span className="bg-white text-sm py-2.5 px-5 rounded-full text-black font-medium">
          {label}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filter by {label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuItem
            onClick={() => handleClick(value, option.option)}
            key={option.option}
            className="cursor-pointer"
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterButton;

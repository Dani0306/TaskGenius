"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectOptions = ({
  value,
  setValue,
  data,
  label,
  placeholder,
}: {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  data: string[];
  label?: string;
  placeholder?: string;
}) => {
  return (
    <div className="flex flex-col space-y-3.5">
      {label && <span className="font-medium text-sm">{label}</span>}
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-full bg-white rounded-md">
          <SelectValue placeholder={placeholder ?? "Select an option"} />
        </SelectTrigger>

        <SelectContent className="w-full z-[99999]" position="popper">
          {data.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOptions;

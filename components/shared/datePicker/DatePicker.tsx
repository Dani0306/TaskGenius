"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

export default function DatePicker({
  setDate,
  date,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selected: Date | undefined) => {
    if (!selected) return;
    setDate(selected);
    setOpen(false);
  };

  return (
    // relative so the dropdown can be absolutely positioned
    <div className="relative flex flex-col gap-3">
      <Label htmlFor="date" className="px-1 w-full mx-auto">
        Due Date
      </Label>

      {/* Trigger */}
      <Button
        id="date"
        type="button"
        variant="outline"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full mx-auto justify-between font-normal"
      >
        {date ? date.toLocaleDateString() : "Select date"}
        <ChevronDownIcon className="h-4 w-4 opacity-70" />
      </Button>

      {/* Dropdown calendar (overlay, not pushing layout) */}
      {open && (
        <div
          className="
            absolute bottom-10 left-0 mt-2 z-[10000]
            rounded-2xl border border-[#e4ddff]
            bg-white shadow-[0_18px_45px_rgba(88,28,135,0.18)]
            p-3
          "
        >
          <Calendar mode="single" selected={date} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
}

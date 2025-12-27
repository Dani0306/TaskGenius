"use client";

import { Search } from "lucide-react";
import PageButton from "../shared/PageButton";
import { useFilters } from "@/hooks/filters/useFilters";
import { useDebounce } from "@/hooks/debouncer/useDebounce";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ProjectFilters = () => {
  const { handleFilter, hasFilter } = useFilters();

  const { query, setQuery, value } = useDebounce(200);
  const searchParams = useSearchParams();

  useEffect(() => {
    handleFilter({ type: "name", value: value });
  }, [value, handleFilter]);

  return (
    <div className="w-full flex flex-col lg:flex-row space-x-8 lg:items-center justify-center mt-8 lg:justify-between space-y-8 lg:space-y-0">
      <div className="w-full h-max lg:w-[550px] relative">
        <Search className="text-gray-500 size-4.5 absolute top-[39%] left-7 -translate-x-1/2 -translate-y-1" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="w-full shadow-xl py-2 text-gray-600 bg-white pl-12 rounded-full text-sm lg:text-base placeholder:text-gray-500"
          placeholder="Search Projects ..."
        />
      </div>
      <div className="flex gap-3 flex-wrap md:justify-end">
        <PageButton
          onClick={() => handleFilter({ type: "status", value: "" })}
          text="All"
          light={
            !(searchParams.get("status") === "" || !searchParams.get("status"))
          }
        />
        <PageButton
          onClick={() => handleFilter({ type: "status", value: "active" })}
          text="Active"
          light={!hasFilter({ type: "status", value: "active" })}
        />
        <PageButton
          onClick={() => handleFilter({ type: "status", value: "paused" })}
          text="Paused"
          light={!hasFilter({ type: "status", value: "paused" })}
        />
        <PageButton
          onClick={() => handleFilter({ type: "status", value: "completed" })}
          text="Completed"
          light={!hasFilter({ type: "status", value: "completed" })}
        />
        <PageButton
          onClick={() => handleFilter({ type: "status", value: "archived" })}
          text="Archived"
          light={!hasFilter({ type: "status", value: "archived" })}
        />
      </div>
    </div>
  );
};

export default ProjectFilters;

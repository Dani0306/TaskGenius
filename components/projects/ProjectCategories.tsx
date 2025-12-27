import {
  CATEGORY_META,
  PROJECT_CATEGORIES,
} from "@/constants/project/categories";
import { ProjectCategory } from "@/types";
import React from "react";

const ProjectCategories = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: ProjectCategory | undefined;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<ProjectCategory | undefined>
  >;
}) => {
  return (
    <div className="w-full flex flex-wrap gap-5 mt-8 items-center justify-center">
      {PROJECT_CATEGORIES.map((category) => {
        const item = CATEGORY_META[category];
        const selected = selectedCategory === category;

        return (
          <div
            onClick={() => setSelectedCategory(category)}
            className="flex flex-col items-center space-y-2 cursor-pointer"
            key={category}
          >
            <item.icon
              className={`size-10 lg:size-12 rounded-full p-3 ${item.bg} ${
                item.text
              } ${selected && "border-2 border-primary"}`}
            />
            <span className=" text-xs">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectCategories;

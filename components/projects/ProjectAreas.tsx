import {
  PROJECT_AREAS,
  PROJECT_AREAS_META,
} from "@/constants/project/improviseProject";
import React from "react";

const ProjectAreas = ({
  selectedArea,
  setSelectedArea,
}: {
  selectedArea: string | undefined;
  setSelectedArea: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full flex flex-wrap gap-5 mt-2 items-center justify-center">
      {PROJECT_AREAS.map((area) => {
        const item = PROJECT_AREAS_META[area];
        const selected = selectedArea === area;

        return (
          <div
            onClick={() => setSelectedArea(area)}
            className="flex flex-col items-center space-y-2 cursor-pointer"
            key={area}
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

export default ProjectAreas;

"use client";

import { Project } from "@/types";
import ProjectCard from "../project/ProjectCard";
const ProjectsGrid = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-12">
      {projects.length > 0 ? (
        <>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </>
      ) : (
        <p className="text-base text-gray-600">No projects available.</p>
      )}
    </div>
  );
};

export default ProjectsGrid;

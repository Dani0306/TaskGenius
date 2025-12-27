import { Project } from "@/types";
import ProjectStatusPill from "./ProjectStatusPill";
import { DueDatePill } from "./DueDatePill";
import ProgressBar from "./ProgressBar";
import ProjectMembersPreview from "./ProjectMembersPreview";
import { User } from "@supabase/supabase-js";
import { getProjectProgress } from "@/lib/utils";

const ProjectHeader = ({ project, user }: { project: Project; user: User }) => {
  const progress = getProjectProgress(project);
  return (
    <div className="flex flex-col items-start space-y-3">
      <div className="mt-12 flex space-x-8 space-y-4 flex-col lg:flex-row lg:items-center w-full lg:w-[70%]">
        <div className="w-max flex rounded-full space-x-4 items-center justify-center">
          <ProjectStatusPill status={project.status} />
          <DueDatePill className="text-xs" date={String(project.due_date)} />
        </div>
        <ProgressBar progress={progress.progress} />
      </div>
      <ProjectMembersPreview user={user} project={project} />
    </div>
  );
};

export default ProjectHeader;

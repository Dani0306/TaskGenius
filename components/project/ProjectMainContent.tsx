import { Project } from "@/types";
import PageHeader from "../shared/pageHeader/PageHeader";
import ContentContainer from "../shared/pageContainer/ContentContainer";
import ProjectHeader from "./ProjectHeader";
import ProjectActionContent from "./ProjectActionContent";
import TasksHeader from "./TasksHeader";
import TasksGrid from "./TasksGrid";
import { User } from "@supabase/supabase-js";

const ProjectMainContent = ({
  project,
  user,
}: {
  project: Project;
  user: User;
}) => {
  return (
    <ContentContainer>
      <PageHeader
        title={project.name}
        subtitle={project.description}
        actionContent={<ProjectActionContent project={project} />}
      />
      <ProjectHeader user={user} project={project} />

      <TasksHeader user={user} project={project} />
      <TasksGrid user={user} project={project} />
    </ContentContainer>
  );
};

export default ProjectMainContent;

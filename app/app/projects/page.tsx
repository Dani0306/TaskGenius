import { getMyProjects } from "@/actions/projects";
import AIGenerateProjectButton from "@/components/projects/AIGenerateProjectButton";
import CreateProjectButton from "@/components/projects/CreateProjectButton";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ErrorScreen from "@/components/shared/error/ErrorScreen";
import ContentContainer from "@/components/shared/pageContainer/ContentContainer";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import { Project, ProjectStatus, SearchParamProps } from "@/types";
import { tryCatch } from "@/utils/fn/tryCatch";

const page = async ({ searchParams }: SearchParamProps) => {
  const name = ((await searchParams)?.name as string) || "";
  const status = ((await searchParams)?.status as ProjectStatus) || undefined;
  const category = ((await searchParams)?.category as string) || "";

  const [projects, err] = await tryCatch<Project[], Error>(
    getMyProjects({ name, status, category })
  );

  if (err) return <ErrorScreen error={err} />;

  return (
    <ContentContainer>
      <PageHeader
        title="Projects"
        subtitle="Manage all your projects in one place."
        actionContent={<AIGenerateProjectButton />}
      />
      <ProjectFilters />
      <ProjectsGrid projects={projects!} />
      <CreateProjectButton />
    </ContentContainer>
  );
};

export default page;

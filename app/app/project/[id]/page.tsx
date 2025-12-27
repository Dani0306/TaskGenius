import { getProject } from "@/actions/projects";
import ProjectMainContent from "@/components/project/ProjectMainContent";
import ErrorScreen from "@/components/shared/error/ErrorScreen";
import { tryCatch } from "@/utils/fn/tryCatch";
import { createServerSupabase } from "@/utils/supabase/server";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: ProjectPageProps) => {
  const { id } = await params;

  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [project, error] = await tryCatch(getProject(id));

  if (error)
    return (
      <ErrorScreen error={error} message="We couldn't pull up your project." />
    );

  return <ProjectMainContent project={project} user={user!} />;
};

export default page;

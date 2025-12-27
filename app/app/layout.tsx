import { createServerSupabase } from "@/utils/supabase/server";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import PageContainer from "@/components/shared/pageContainer/PageContainer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <PageContainer>
      <SidebarProvider>
        <AppSidebar user={user} />
        <main className="w-full">
          <SidebarTrigger className="md:ml-3" />
          {children}
        </main>
      </SidebarProvider>
    </PageContainer>
  );
}

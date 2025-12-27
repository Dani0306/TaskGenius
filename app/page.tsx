import LandingCards from "@/components/landing/landingCards/LandingCards";
import LandingFAQ from "@/components/landing/landingFAQ/LandingFAQ";
import LandingFooter from "@/components/landing/landingFooter/LandingFooter";
import LandingHeader from "@/components/landing/landingHeader/LandingHeader";
import LandingHero from "@/components/landing/landingHero/LandingHero";
import LandingImage from "@/components/landing/landingImage/LandingImage";
import LandingPricing from "@/components/landing/landingPricing/LandingPricing";
import LandingTestimonies from "@/components/landing/landingTestimonies/LandingTestimonies";
import PageContainer from "@/components/shared/pageContainer/PageContainer";
import { createServerSupabase } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <PageContainer>
      <LandingHeader user={user} />
      <LandingHero user={user} />
      <LandingCards />
      <LandingImage />
      <LandingTestimonies />
      <LandingPricing />
      <LandingFAQ />
      <LandingFooter />
    </PageContainer>
  );
}

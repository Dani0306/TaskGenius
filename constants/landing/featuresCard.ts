import { Sparkles, FolderCog, Bolt, Network, LucideIcon } from "lucide-react";

type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const featuresCard: FeatureCard[] = [
  {
    title: "AI Insights",
    description:
      "Leverage AI to get predictive insights and make smarter decisions for your projects.",
    icon: Sparkles,
  },
  {
    title: "Smart Projects",
    description:
      "Organize and track your team's work in a collaborative and visual way.",
    icon: FolderCog,
  },
  {
    title: "Automated Tasks",
    description:
      "Let our AI handle repetitive tasks so you can focus on high-impact work.",
    icon: Bolt,
  },
  {
    title: "Seamless Integrations",
    description:
      "Connect with the tools you already use to create a unified workflow.",
    icon: Network,
  },
];

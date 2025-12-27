import { PricingPlan } from "@/lib/types";

export const pricingPlans: PricingPlan[] = [
  {
    plan: "Starter",
    price: 0,
    priceSuffix: "/mo",
    description: "Ideal for individuals just getting started.",
    features: ["Basic task management", "Limited AI actions per month"],
    buttonText: "Sign Up For Free",
  },
  {
    plan: "Pro",
    price: 12,
    priceSuffix: "/mo",
    description: "Best for power users and individuals.",
    badge: "Most Popular",
    features: [
      "All Starter features",
      "Unlimited AI actions",
      "Unlimited projects",
      "Advanced analytics",
    ],
    buttonText: "Start Pro Trial",
  },
  {
    plan: "Team",
    price: 25,
    priceSuffix: "/user/mo",
    description: "For teams that need to collaborate.",
    features: [
      "All Pro features",
      "Shared workspaces",
      "Priority AI processing",
      "Team administration",
    ],
    buttonText: "Contact Sales",
  },
];

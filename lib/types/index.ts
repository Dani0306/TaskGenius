export type Testimonial = {
  name: string;
  role: string;
  rating: number; // 1–5 stars
  testimonial: string;
  image: string; // URL or local path
};

export type PricingPlan = {
  plan: string;
  price: number;
  priceSuffix?: string; // "/mo", "/user/mo", etc.
  description: string;
  features: string[];
  buttonText: string;
  badge?: string; // e.g., "Most Popular"
};

export type FAQ = {
  question: string;
  answer: string[];
  value: string; // "item-1", "item-2"
};

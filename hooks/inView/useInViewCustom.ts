"use client";

import { useInView } from "react-intersection-observer";

export function useInViewCustom() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return { ref, inView };
}

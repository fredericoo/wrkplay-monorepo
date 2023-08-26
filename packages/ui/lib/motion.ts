import { Transition } from "framer-motion";

export const easing = {
  springFast: { type: "spring", bounce: 0, damping: 300, stiffness: 3000 },
} satisfies Record<string, Transition>;

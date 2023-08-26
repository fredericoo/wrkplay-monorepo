const safeAreaVars = [
  "--safe-area-inset-top",
  "--safe-area-inset-right",
  "--safe-area-inset-bottom",
  "--safe-area-inset-left",
] as const;

export type SafeAreaVar = (typeof safeAreaVars)[number];

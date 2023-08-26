import { cva, RecipeVariantProps } from "styled-system/css";

export const tabListVariant = cva({
  base: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "scroll",
    WebkitOverflowScrolling: "touch",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  variants: {
    variant: {
      default: {},
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
    tabsPlacement: {
      start: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      fill: {},
    },
  },
  defaultVariants: {
    variant: "default",
    tabsPlacement: "start",
  },
});

export const tabVariant = cva({
  variants: {
    variant: {
      default: {},
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
    tabsPlacement: {
      start: {},
      center: {},
      fill: {},
    },
  },
});

export const tabLabelVariant = cva({
  variants: {
    isActive: {
      true: {
        color: "red.100",
      },
      false: {},
    },
  },
});

export const activeMarkerVariant = cva({
  variants: {
    variant: {
      default: {},
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
    tabsPlacement: {
      start: {},
      center: {},
      fill: {},
    },
  },
});

export type TabsListVariants = NonNullable<
  RecipeVariantProps<typeof tabListVariant>
>;

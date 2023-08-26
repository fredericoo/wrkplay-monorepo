import * as T from "@radix-ui/react-tabs";
import { LayoutGroup } from "framer-motion";
import React, { useId } from "react";
import { useTabsVariants } from "../context";
import { tabListVariant } from "../tabs.style";

export type TabsListProps = T.TabsListProps;

export const List: React.FC<TabsListProps> = ({ children, ...props }) => {
  const {
    variants: { tabsPlacement: tabsPosition, variant },
  } = useTabsVariants();
  const id = useId();

  return (
    <LayoutGroup id={`tablist-${id}`}>
      <T.List
        className={tabListVariant({ tabsPlacement: tabsPosition, variant })}
        {...props}
      >
        {children}
      </T.List>
    </LayoutGroup>
  );
};

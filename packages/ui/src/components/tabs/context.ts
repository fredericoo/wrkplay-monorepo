import { createContext, useContext } from "react";
import { TabsListVariants } from "./tabs.style";

export const TabsContext = createContext<{
  variants: TabsListVariants;
  activeTabId?: string;
}>({ variants: {} });
export const useTabsVariants = () => useContext(TabsContext);

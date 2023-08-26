import { useLocation, useNavigation, useSearchParams } from "react-router-dom";
import { useCallback } from "react";

/** Returns an optimistic location, i.e.: the location before any loaders complete.
 * This is useful for making the UI feel more responsive, while still fetching data.
 */
export const useOptimisticLocation = () => {
  const location = useLocation();
  const { location: nextLocation } = useNavigation();

  return nextLocation || location;
};

/** Returns a function that allows you to manipulate search parameters in a URL.
 * This is useful for making links that do not override existing search parameters.
 *
 * @example
 * const getStatefulUrl = useGetStatefulUrl();
 * const url = getStatefulUrl("/venue/123?page=3", { tab: "info" });
 * // url === "/venue/123?page=3&tab=info"
 */
export const useGetStatefulUrl = () => {
  const [params] = useSearchParams();
  const getStatefulUrl = useCallback(
    (url: string, extraParams?: Record<string, string | number>) => {
      const paramsObj = Object.fromEntries(params);
      Object.assign(paramsObj, extraParams);
      const paramsString = new URLSearchParams(paramsObj).toString();
      return [url, paramsString].filter(Boolean).join("?");
    },
    [params]
  );
  return getStatefulUrl;
};

import {
  startTransition,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const useMediaQuery = (query: string) => {
  const [targetReached, setTargetReached] = useState<boolean>();

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    startTransition(() => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    });
  }, []);

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia(query);
    media.addEventListener("change", updateTarget);
    startTransition(() => {
      setTargetReached(media.matches);
    });

    return () => media.removeEventListener("change", updateTarget);
  }, []);

  return targetReached;
};

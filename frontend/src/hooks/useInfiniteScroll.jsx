import { useCallback, useEffect, useRef } from "react";

export const useInfiniteScroll = (onIntersect) => {
  const ref = useRef(null);

  const handleIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting) {
        await onIntersect(entry, observer);
      }
    },
    [onIntersect],
  );

  useEffect(() => {
    let observer;
    if (ref.current) {
      observer = new IntersectionObserver(handleIntersect, { threshold: 0.6 });
      observer.observe(ref.current);
    }
    return () => observer && observer.disconnect();
  }, [ref, handleIntersect]);

  return ref;
};

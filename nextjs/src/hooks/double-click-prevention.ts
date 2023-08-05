import { useCallback, useRef } from "react";

interface ReturnType<T> {
  fn: (t: T) => void;
}

export const useDoubleClickPrevention = <T>(
  asyncFn: (t: T) => Promise<void>,
): ReturnType<T> => {
  const processing = useRef(false);

  const fn = useCallback(
    (t: T): void => {
      if (!processing.current) {
        processing.current = true;
        void asyncFn(t).finally(() => {
          processing.current = false;
        });
      }
    },
    [asyncFn],
  );
  return {
    fn,
  };
};

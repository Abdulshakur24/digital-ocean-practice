import { useCallback, useRef } from "react";

const useThrottle = (
  fn: Function,
  delay: number,
  dependence: number[] = []
) => {
  const ref = useRef({ lastTime: 0 });

  return useCallback(
    (...args: any) => {
      const now = Date.now();

      if (now - ref.current.lastTime >= delay) {
        fn(...args);
        ref.current.lastTime = now;
      }
    },
    [fn, delay]
  );
};

export default useThrottle;

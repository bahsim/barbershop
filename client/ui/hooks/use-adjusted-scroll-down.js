import { useCallback } from 'react';

export const useAdjustedScrollDown = ref => {
  /**
   * Scrolls to the previous position or completely to bottom (on demand)
   */
  const adjust = useCallback(
    (scrollToBottom, previousScroll) => {
      if (!ref.current) return;

      const node = ref.current;

      const height = !scrollToBottom && previousScroll
        ? previousScroll.height
        : 0;

      node.scrollTop = height;
    },
    [ref],
  );

  return adjust;
};

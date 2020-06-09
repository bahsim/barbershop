import { useState, useEffect, useCallback } from 'react';

export const useInfiniteScrollDown = ({ 
  ref, hasMore, onLoadMore, adjustScroll,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [previousScroll, setPreviousScroll] = useState();
  const [buttonUp, setButtonUp] = useState(false);

  const handleScroll = useCallback(() => {
    const elem = ref.current;

    if (elem.scrollTop > 150) {
      setButtonUp(true);
    } else {
      setButtonUp(false);
    }

    const isBottomReached = elem.scrollHeight - elem.scrollTop === elem.clientHeight
    
    if (isBottomReached && isFetching === false && hasMore) {
      setPreviousScroll({
        top: elem.scrollTop,
        height: elem.scrollTop + 100,
      });
      setIsFetching(true);
    }
  }, [ref, isFetching, hasMore, previousScroll]);

  useEffect(() => {
    const elem = ref.current;

    if (!elem) {
      return;
    }

    elem.addEventListener('scroll', handleScroll);

    return () => {
      elem.removeEventListener('scroll', handleScroll);
    };
  }, [ref, handleScroll]);

  // loads more if fetching has started
  useEffect(() => {
    if (isFetching) {
      onLoadMore(stopFetching);
    }
  }, [isFetching, onLoadMore]);

  const stopFetching = useCallback(() => {
    setIsFetching(false);
    adjustScroll(false, previousScroll);
  }, [previousScroll]);

  return [isFetching, stopFetching, buttonUp];
};

export default useInfiniteScrollDown;

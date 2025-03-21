import { useEffect, useRef } from 'react';

export const useUnmount = (beforeUnmount) => {
  const ref = useRef(beforeUnmount);
  useEffect(() => {
    return () => {
      ref.current();
    };
  }, []);
};

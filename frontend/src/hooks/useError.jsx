import { useState, useEffect } from 'react';

const useError = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { error, setError };
};

export default useError;

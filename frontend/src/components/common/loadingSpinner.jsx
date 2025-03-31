import React from 'react';
import { useSelector } from 'react-redux';

import { logo } from '../../utils/staticImagePath';

const LoadingSpinner = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <img src={logo} alt="" className="animate-spin w-30" />
      </div>
    </>
  );
};

export default LoadingSpinner;

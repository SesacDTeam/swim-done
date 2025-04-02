import React from 'react';

import { poolBuoy } from '../../utils/staticImagePath';

const LoadingSpinner = (isLoading) => {
  if (!isLoading) return null;

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <img src={poolBuoy} alt="" className="animate-spin w-30" />
      </div>
    </>
  );
};

export default LoadingSpinner;

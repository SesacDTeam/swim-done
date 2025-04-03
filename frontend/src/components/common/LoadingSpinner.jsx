import React from 'react';

import { poolBuoy } from '../../utils/staticImagePath';

const LoadingSpinner = ({ backgroundColor }) => {
  return (
    <>
      <div className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center ${backgroundColor}`}>
        <img src={poolBuoy} alt="" className="animate-spin w-30" />
      </div>
    </>
  );
};

export default LoadingSpinner;
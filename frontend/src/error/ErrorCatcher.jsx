import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

export default function ErrorCatcher({ children }) {
  const error = useSelector((state) => state.error.error);

  useEffect(() => {
    if (!error) {
      return;
    }

    toast.error(error.message, {
      className: 'p-0 w-[400px]',
    });
  }, [error]);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
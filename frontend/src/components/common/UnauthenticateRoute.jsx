import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export default function UnauthenticateRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1);
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return null;
  } else {
    return <>{children}</>;
  }
}

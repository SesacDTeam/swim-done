import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../store/slices/authSlice';
import ERROR_CODE from '../error/ERROR_CODE';
import RequestError from '../error/RequestError';
import ERROR_DISPLAY_MODE from '../error/ERROR_DISPLAY_MODE';
import { setRequestError } from '../store/slices/errorSlice';

const useErrorResolver = (errorDisplayMode) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) {
      return;
    }

    if (!error.response) {
      const requestError = new RequestError(
        '네트워크 연결을 확인해주세요',
        error.code,
        errorDisplayMode,
        error.config,
      );
      dispatch(setRequestError(requestError));
      throw requestError;
    }

    const errorCode = error.response.data.code;

    if (errorCode === ERROR_CODE.REISSUE_FAIL) {
      dispatch(logout());
      navigate('/login');
      return;
    }

    const requestError = new RequestError(
      error.response.data.message,
      errorCode,
      errorDisplayMode,
      error.config,
    );

    if (errorDisplayMode === ERROR_DISPLAY_MODE.TOAST) {
      dispatch(setRequestError(requestError));
      return;
    }

    throw requestError;
  }, [error]);

  return { error, setError };
};

export default useErrorResolver;

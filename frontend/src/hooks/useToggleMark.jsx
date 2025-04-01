import { markPoolApi } from '../api/markPoolApi';
import ERROR_DISPLAY_MODE from '../error/ERROR_DISPLAY_MODE';
import useErrorResolver from './useErrorResolver';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setPools } from '../store/slices/kakaoMapSlice';

export const useToggleMark = () => {
  const dispatch = useDispatch();
  const { setError } = useErrorResolver(ERROR_DISPLAY_MODE.TOAST);
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggleMark = async (index, pools, setPoolList) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    const isMarked = pools[index].mark;

    try {
      if (isMarked) {
        await markPoolApi.deleteMyMarkedPools(pools[index].id);
      } else {
        await markPoolApi.createMarkedPools(pools[index].id);
      }

      setPoolList((prev) => {
        const updatedPools = [...prev];
        updatedPools[index] = {
          ...updatedPools[index],
          mark: !isMarked,
        };
        dispatch(setPools(updatedPools));
        return updatedPools;
      });
    } catch (error) {
      setError(error);
    }
  };

  return { toggleMark, showLoginModal, setShowLoginModal };
};

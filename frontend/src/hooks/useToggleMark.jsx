import { markPoolApi } from '../api/markPoolApi';
import ERROR_DISPLAY_MODE from '../error/ERROR_DISPLAY_MODE';
import useErrorResolver from './useErrorResolver';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const useToggleMark = () => {
  const { setError } = useErrorResolver(ERROR_DISPLAY_MODE.TOAST);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });
  const toggleMark = async (index, pools, setPools) => {
    if (!isLoggedIn) {
      navigate('/login');
    }
    const isMarked = pools[index].mark;

    try {
      if (isMarked) {
        await markPoolApi.deleteMyMarkedPools(pools[index].id);
      } else {
        await markPoolApi.createMarkedPools(pools[index].id);
      }

      setPools((prev) => {
        const updatedPools = [...prev];
        updatedPools[index] = {
          ...updatedPools[index],
          mark: !isMarked,
        };

        return updatedPools;
      });
    } catch (error) {
      setError(error);
    }
  };

  return { toggleMark };
};

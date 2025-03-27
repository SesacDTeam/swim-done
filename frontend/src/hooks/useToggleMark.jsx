import { markPoolApi } from '../api/markPoolApi';
import ERROR_DISPLAY_MODE from '../error/ERROR_DISPLAY_MODE';
import useErrorResolver from './useErrorResolver';

export const useToggleMark = () => {
  const { setError } = useErrorResolver(ERROR_DISPLAY_MODE.TOAST);

  const toggleMark = async (index, pools, setPools) => {
    const isMarked = pools[index].mark;
    setPools((prev) => {
      const updatedPools = [...prev];
      updatedPools[index] = {
        ...updatedPools[index],
        mark: !isMarked,
      };

      return updatedPools;
    });

    try {
      if (isMarked) {
        await markPoolApi.deleteMyMarkedPools(pools[index].id);
      } else {
        await markPoolApi.createMarkedPools(pools[index].id);
      }
    } catch (error) {
      setError(error);
    }
  };

  return { toggleMark };
};

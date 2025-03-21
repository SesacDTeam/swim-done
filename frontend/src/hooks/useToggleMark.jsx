import { markPoolApi } from "../api/markPoolApi";

export const useToggleMark = (pools, setPools, token) => {
  const toggleMark = async (index) => {
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
        await markPoolApi.deleteMyMarkedPools(token, pools[index].id);
      } else {
        await markPoolApi.createMarkedPools(token, pools[index].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { toggleMark };
};

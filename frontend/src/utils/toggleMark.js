import { markPoolApi } from "../api/markPoolApi";

export const toggleMark = async (index, pools, setPools) => {
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
    }
};

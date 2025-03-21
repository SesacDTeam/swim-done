import { markPoolApi } from "../api/markPoolApi";

export const toggleMark = async (index, pools, setPools, token) => {
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

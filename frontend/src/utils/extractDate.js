export const extractDate = (isoString) => {
  return isoString.split("T")[0];
}
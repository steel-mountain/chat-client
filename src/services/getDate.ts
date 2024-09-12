export const getDate = () => {
  const date = new Date();

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return `${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}`;
};

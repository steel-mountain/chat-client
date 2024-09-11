export const getDate = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}`;
};

export const getPlayYMD = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  return `${year}${addZero(month)}${addZero(day)}`;
};

export const addZero = (value: number) => {
  return ('0' + value).slice(-2);
};
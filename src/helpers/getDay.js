export const getDay = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.toLocaleDateString(undefined, { weekday: 'long' });
  return day;
};

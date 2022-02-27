export const getFullDate = () => {
  const dateObj = new Date();
  const dateStr = dateObj.toLocaleDateString(undefined, {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

  return dateStr;
};

export const getShortDate = (date) => {
  const dateObj = new Date(date);
  const dateStr = dateObj.toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit',
  });

  return dateStr;
};

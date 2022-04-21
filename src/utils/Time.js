import dayjs from 'dayjs';

export const purifyTime = (time, format = 'YYYY-MM-DD HH:mm') => {
  return dayjs(time).format(format);
};
export const orderTime = (time, format = 'YYYY-MM-DD') => {
  return dayjs(time).format(format);
};

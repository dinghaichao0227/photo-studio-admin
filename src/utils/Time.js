import dayjs from "dayjs";

export const purifyTime = (format = "YYYY-MM-DD HH") => {
  return dayjs().format(format);
};
export const time = () => {
  return dayjs().format("HH:mm - HH:mm");
};
// export const formatTime = (time, format = 'YYYY-MM-DD HH:mm:ss') =>
//   dayjs().format(format);

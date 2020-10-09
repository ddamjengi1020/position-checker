export const calcDay = (dbDate, serverDate) => {
  const prevDate = new Date(dbDate).getTime();
  const nowDate = new Date(serverDate).getTime();
  const pastDays = (nowDate - prevDate) / 1000 / 60 / 60 / 24;
  const prevDateDays = new Date(dbDate).getDay();
  return { pastDays, prevDateDays };
};

const updateData = (dataArray) => {
  const firstValue = dataArray.shift();
  dataArray.push(firstValue);
  return dataArray;
};

const dayOfTheWeeks = ["Sun", "Mon", "Thu", "Web", "Thr", "Fri", "Sat"];

const indexOfDays = (prevDateDays, dayOfTheWeeks, i) =>
  prevDateDays + i + 1 >= dayOfTheWeeks.length
    ? prevDateDays + i + 1 - dayOfTheWeeks.length
    : prevDateDays + i + 1;

export const calcPosition = (
  pastDays,
  prevDateDays,
  lunchdayPosition,
  lunchendPosition,
  middledayPosition,
  middleendPosition,
  morningdayPosition,
  morningendPosition
) => {
  for (let i = 0; i < pastDays; i++) {
    if (
      dayOfTheWeeks[indexOfDays(prevDateDays, dayOfTheWeeks, i)] !== "Sun" &&
      dayOfTheWeeks[indexOfDays(prevDateDays, dayOfTheWeeks, i)] !== "Sat"
    ) {
      updateData(morningdayPosition);
      updateData(lunchdayPosition);
      updateData(middledayPosition);
    } else {
      updateData(morningendPosition);
      updateData(lunchendPosition);
      updateData(middleendPosition);
    }
  }
};

export const currentGetTime = () => {
  const getDate = new Date();
  const convertToTime = getDate.getTime();
  const NINEHOURS = 32400000;
  const calculation = convertToTime + NINEHOURS;
  const resultDate = new Date(calculation);
  return process.env.PRODUCTMODE ? resultDate : getDate;
};

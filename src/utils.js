export const calcDay = (dbDate) => {
  const today = new Date().toLocaleDateString("en-US");
  const prevDate = new Date(dbDate).getTime();
  const nowDate = new Date(today).getTime();
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
  weekdayPosition,
  weekendPosition,
  morningdayposition,
  morningendposition
) => {
  for (let i = 0; i < pastDays; i++) {
    if (
      dayOfTheWeeks[indexOfDays(prevDateDays, dayOfTheWeeks, i)] !== "Sun" &&
      dayOfTheWeeks[indexOfDays(prevDateDays, dayOfTheWeeks, i)] !== "Sat"
    ) {
      updateData(weekdayPosition);
      updateData(morningdayposition);
    } else {
      updateData(weekendPosition);
      updateData(morningendposition);
    }
  }
};

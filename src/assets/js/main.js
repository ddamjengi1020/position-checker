import axios from "axios";

const updatePosition = (positions) => {
  const firstValue = positions.shift();
  positions.push(firstValue);
  return positions;
};

const dbUpdate = async (newDate, weekdayPosition, weekendPosition) => {
  if (newDate !== "Sun" || newDate !== "Sat") {
    return await axios({
      method: "POST",
      url: "/",
      data: {
        newDate,
        weekdayPosition: updatePosition(weekdayPosition),
        weekendPosition,
      },
    });
  } else {
    return await axios({
      method: "POST",
      url: "/",
      data: {
        newDate,
        weekdayPosition: weekdayPosition,
        weekendPosition: updatePosition(weekendPosition),
      },
    });
  }
};

const refreshTemplate = () => {
  window.location.reload();
};

const compareData = () => {
  const checkDate = setInterval(() => {
    const {
      existedData: { date, weekdayPosition, weekendPosition },
    } = window;
    const today = new Date();
    const newDate = today.toString().slice(0, 3);
    if (newDate !== date) {
      if (newDate !== "Sat" || newDate !== "Sun") {
        dbUpdate(newDate, weekdayPosition, weekendPosition);
      }
      refreshTemplate();
    } else {
      clearInterval(checkDate);
    }
  }, 500);
};

const init = () => {
  compareData();
};

init();

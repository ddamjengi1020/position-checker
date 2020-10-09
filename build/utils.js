"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcPosition = exports.calcDay = void 0;

var calcDay = function calcDay(dbDate) {
  var today = new Date().toLocaleDateString("en-US");
  var prevDate = new Date(dbDate).getTime();
  var nowDate = new Date(today).getTime();
  var pastDays = (nowDate - prevDate) / 1000 / 60 / 60 / 24;
  var prevDateDays = new Date(dbDate).getDay();
  return {
    pastDays: pastDays,
    prevDateDays: prevDateDays
  };
};

exports.calcDay = calcDay;

var updateData = function updateData(dataArray) {
  var firstValue = dataArray.shift();
  dataArray.push(firstValue);
  return dataArray;
};

var dayOfTheWeeks = ["Sun", "Mon", "Thu", "Web", "Thr", "Fri", "Sat"];

var indexOfDays = function indexOfDays(prevDateDays, dayOfTheWeeks, i) {
  return prevDateDays + i + 1 >= dayOfTheWeeks.length ? prevDateDays + i + 1 - dayOfTheWeeks.length : prevDateDays + i + 1;
};

var calcPosition = function calcPosition(pastDays, prevDateDays, lunchdayPosition, lunchendPosition, middledayPosition, middleendPosition, morningdayPosition, morningendPosition) {
  for (var i = 0; i < pastDays; i++) {
    if (dayOfTheWeeks[indexOfDays(prevDateDays, dayOfTheWeeks, i)] !== "Sun" && dayOfTheWeeks[indexOfDays(prevDateDays, dayOfTheWeeks, i)] !== "Sat") {
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

exports.calcPosition = calcPosition;
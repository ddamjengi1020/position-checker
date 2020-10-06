import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fireDB } from "./fbase";
import { calcDay, calcPosition } from "./utils";

const app = express();
const PORT = 3500;

app.set("views", path.join(__dirname + "/views/screens"));
app.set("view engine", "pug");

app.use("/static", express.static("dest"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const existedGetData = await fireDB
      .collection("subway")
      .doc("checker")
      .get();
    const {
      currentDate,
      weekdayPosition,
      weekendPosition,
      morningdayposition,
      morningendposition,
    } = existedGetData.data();

    if (currentDate !== new Date().toLocaleDateString("en-US")) {
      const { pastDays, prevDateDays } = calcDay(currentDate);

      calcPosition(
        pastDays,
        prevDateDays,
        weekdayPosition,
        weekendPosition,
        morningdayposition,
        morningendposition
      );

      await fireDB
        .collection("subway")
        .doc("checker")
        .update({
          currentDate: new Date().toLocaleDateString("en-US"),
          weekdayPosition,
          weekendPosition,
          morningdayposition,
          morningendposition,
        });
    }

    res.status(200);
    res.render("index");
  } catch (error) {
    console.log(error);
    res.status(500);
    res.render("500");
  }
});

app.post("/position", async (req, res) => {
  let myMorningPosition, myAfternoonPosition;
  const {
    body: { workingDay, morningPositionNumber, afternoonPositionNumber },
  } = req;
  try {
    const currentData = await fireDB.collection("subway").doc("checker").get();
    const {
      weekdayPosition,
      weekendPosition,
      morningdayposition,
      morningendposition,
    } = currentData.data();
    if (workingDay === "weekday") {
      myMorningPosition = morningdayposition[morningPositionNumber];
      myAfternoonPosition = weekdayPosition[afternoonPositionNumber];
    } else {
      myMorningPosition = morningendposition[morningPositionNumber];
      myAfternoonPosition = weekendPosition[afternoonPositionNumber];
    }
    res.status(200);
    res.render("position", { myMorningPosition, myAfternoonPosition });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.render("500");
  }
});

app.post("/weekend", async (req, res) => {
  await fireDB.collection("checker").doc("dayOfTheWeek").get();
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

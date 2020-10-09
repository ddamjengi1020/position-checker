import express from "express";
import path from "path";
import helmet from "helmet";
import bodyParser from "body-parser";
import { fireDB } from "./fbase";
import { calcDay, calcPosition } from "./utils";

const app = express();
const PORT = process.env.PORT || 4000;

app.set("views", path.join(__dirname + "/views/screens"));
app.set("view engine", "pug");
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use("/static", express.static(path.join(__dirname + "/static")));
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
      lunchdayPosition,
      lunchendPosition,
      middledayPosition,
      middleendPosition,
      morningdayPosition,
      morningendPosition,
    } = existedGetData.data();

    if (currentDate != new Date().toLocaleDateString("en-US")) {
      const { pastDays, prevDateDays } = calcDay(currentDate);
      calcPosition(
        pastDays,
        prevDateDays,
        lunchdayPosition,
        lunchendPosition,
        middledayPosition,
        middleendPosition,
        morningdayPosition,
        morningendPosition
      );

      await fireDB
        .collection("subway")
        .doc("checker")
        .update({
          currentDate: new Date().toLocaleDateString("en-US"),
          lunchdayPosition,
          lunchendPosition,
          middledayPosition,
          middleendPosition,
          morningdayPosition,
          morningendPosition,
        });
    }
    const testDate = new Date().toLocaleDateString("en-US");
    res.status(200);
    res.render("index", { testDate });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.render("500");
  }
});

app.post("/position", async (req, res) => {
  let myMorningPosition, myLunchPosition, myMiddlePosition;
  const {
    body: {
      workingDay,
      morningPositionNumber,
      lunchPositionNumber,
      middlePositionNumber,
    },
  } = req;
  try {
    const currentData = await fireDB.collection("subway").doc("checker").get();
    const {
      lunchdayPosition,
      lunchendPosition,
      middledayPosition,
      middleendPosition,
      morningdayPosition,
      morningendPosition,
    } = currentData.data();
    if (workingDay === "weekday") {
      myMorningPosition = morningdayPosition[morningPositionNumber];
      myLunchPosition = lunchdayPosition[lunchPositionNumber];
      myMiddlePosition = middledayPosition[middlePositionNumber];
    } else if (workingDay === "weekend") {
      myMorningPosition = morningendPosition[morningPositionNumber];
      myLunchPosition = lunchendPosition[lunchPositionNumber];
      myMiddlePosition = middleendPosition[middlePositionNumber];
    }
    res.status(200);
    res.render("position", {
      myMorningPosition,
      myLunchPosition,
      myMiddlePosition,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.render("500");
  }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

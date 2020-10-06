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
app.use(helmet());
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
      weekdayPosition,
      weekendPosition,
      morningdayposition,
      morningendPosition,
    } = existedGetData.data();

    if (currentDate !== new Date().toLocaleDateString("en-US")) {
      const { pastDays, prevDateDays } = calcDay(currentDate);

      calcPosition(
        pastDays,
        prevDateDays,
        weekdayPosition,
        weekendPosition,
        morningdayposition,
        morningendPosition
      );

      await fireDB
        .collection("subway")
        .doc("checker")
        .update({
          currentDate: new Date().toLocaleDateString("en-US"),
          weekdayPosition,
          weekendPosition,
          morningdayposition,
          morningendPosition,
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
      morningendPosition,
    } = currentData.data();
    if (workingDay === "weekday") {
      myMorningPosition = morningdayposition[morningPositionNumber];
      myAfternoonPosition = weekdayPosition[afternoonPositionNumber];
    } else if (workingDay === "weekend") {
      myMorningPosition = morningendPosition[morningPositionNumber];
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

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

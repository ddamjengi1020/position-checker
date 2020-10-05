import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fireDB } from "./fbase";

const app = express();
const PORT = 3500;

app.set("views", path.join(__dirname + "/views/screens"));
app.set("view engine", "pug");

app.use("/static", express.static("dest"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const currentData = await fireDB
      .collection("checker")
      .doc("dayOfTheWeek")
      .get();

    res.status(200);
    res.render("index", { currentData: JSON.stringify(currentData.data()) });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.render("500");
  }
});

app.post("/", async (req, res) => {
  const {
    body: { newDate, weekdayPosition, weekendPosition },
  } = req;
  try {
    await fireDB.collection("checker").doc("dayOfTheWeek").update({
      date: newDate,
      weekdayPosition,
      weekendPosition,
    });
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
});

app.post("/weekend", async (req, res) => {
  await fireDB.collection("checker").doc("dayOfTheWeek").get();
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

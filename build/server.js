"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _helmet = _interopRequireDefault(require("helmet"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _fbase = require("./fbase");

var _utils = require("./utils");

var app = (0, _express["default"])();
var PORT = process.env.PORT || 4000;
app.set("views", _path["default"].join(__dirname + "/views/screens"));
app.set("view engine", "pug");
app.use((0, _helmet["default"])({
  contentSecurityPolicy: false
}));
app.use("/static", _express["default"]["static"](_path["default"].join(__dirname + "/static")));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.get("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var existedGetData, _existedGetData$data, currentDate, lunchdayPosition, lunchendPosition, middledayPosition, middleendPosition, morningdayPosition, morningendPosition, _calcDay, pastDays, prevDateDays;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _fbase.fireDB.collection("subway").doc("checker").get();

          case 3:
            existedGetData = _context.sent;
            _existedGetData$data = existedGetData.data(), currentDate = _existedGetData$data.currentDate, lunchdayPosition = _existedGetData$data.lunchdayPosition, lunchendPosition = _existedGetData$data.lunchendPosition, middledayPosition = _existedGetData$data.middledayPosition, middleendPosition = _existedGetData$data.middleendPosition, morningdayPosition = _existedGetData$data.morningdayPosition, morningendPosition = _existedGetData$data.morningendPosition;

            if (!(currentDate != new Date().toLocaleDateString("en-US"))) {
              _context.next = 10;
              break;
            }

            _calcDay = (0, _utils.calcDay)(currentDate), pastDays = _calcDay.pastDays, prevDateDays = _calcDay.prevDateDays;
            (0, _utils.calcPosition)(pastDays, prevDateDays, lunchdayPosition, lunchendPosition, middledayPosition, middleendPosition, morningdayPosition, morningendPosition);
            _context.next = 10;
            return _fbase.fireDB.collection("subway").doc("checker").update({
              currentDate: new Date().toLocaleDateString("en-US"),
              lunchdayPosition: lunchdayPosition,
              lunchendPosition: lunchendPosition,
              middledayPosition: middledayPosition,
              middleendPosition: middleendPosition,
              morningdayPosition: morningdayPosition,
              morningendPosition: morningendPosition
            });

          case 10:
            res.status(200);
            res.render("index");
            _context.next = 19;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500);
            res.render("500");

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.post("/position", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var myMorningPosition, myLunchPosition, myMiddlePosition, _req$body, workingDay, morningPositionNumber, lunchPositionNumber, middlePositionNumber, currentData, _currentData$data, lunchdayPosition, lunchendPosition, middledayPosition, middleendPosition, morningdayPosition, morningendPosition;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, workingDay = _req$body.workingDay, morningPositionNumber = _req$body.morningPositionNumber, lunchPositionNumber = _req$body.lunchPositionNumber, middlePositionNumber = _req$body.middlePositionNumber;
            _context2.prev = 1;
            _context2.next = 4;
            return _fbase.fireDB.collection("subway").doc("checker").get();

          case 4:
            currentData = _context2.sent;
            _currentData$data = currentData.data(), lunchdayPosition = _currentData$data.lunchdayPosition, lunchendPosition = _currentData$data.lunchendPosition, middledayPosition = _currentData$data.middledayPosition, middleendPosition = _currentData$data.middleendPosition, morningdayPosition = _currentData$data.morningdayPosition, morningendPosition = _currentData$data.morningendPosition;

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
              myMorningPosition: myMorningPosition,
              myLunchPosition: myLunchPosition,
              myMiddlePosition: myMiddlePosition
            });
            _context2.next = 16;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.status(500);
            res.render("500");

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 11]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.listen(PORT, function () {
  return console.log("http://localhost:".concat(PORT));
});
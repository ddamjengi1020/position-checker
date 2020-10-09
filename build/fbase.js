"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fireDB = void 0;

var _firebase = _interopRequireDefault(require("firebase"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("firebase/firestore");

// import "firebase/analytics";
_dotenv["default"].config();

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}; // Initialize Firebase

_firebase["default"].initializeApp(firebaseConfig); // firebase.analytics();


var fireDB = _firebase["default"].firestore();

exports.fireDB = fireDB;
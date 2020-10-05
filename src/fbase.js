import firebase from "firebase";
// import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_5rIbL45cgngrm3aa7PODKDkBuN5W5bU",
  authDomain: "position-checker-501cb.firebaseapp.com",
  databaseURL: "https://position-checker-501cb.firebaseio.com",
  projectId: "position-checker-501cb",
  storageBucket: "position-checker-501cb.appspot.com",
  messagingSenderId: "438886295883",
  appId: "1:438886295883:web:8be1587495bf6e0aa560ce",
  measurementId: "G-CW2WLB41DW",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const fireDB = firebase.firestore();

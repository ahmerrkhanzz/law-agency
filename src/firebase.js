import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAGkt_gIb9iihDek8OTifWlwNWh1AMb8n0",
  authDomain: "global-law-firm-175b2.firebaseapp.com",
  databaseURL: "https://global-law-firm-175b2.firebaseio.com",
  projectId: "global-law-firm-175b2",
  storageBucket: "global-law-firm-175b2.appspot.com",
  messagingSenderId: "710039274939",
  appId: "1:710039274939:web:9361eeb662196e8cd3709e",
  measurementId: "G-4JWDVHCM2J",
});

const db = firebaseApp.fireStore();
const auth = firebaseApp.auth();

export { auth, db };

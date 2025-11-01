import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAqOs_VzyyvaYhgKlsXPVUPiuoYHF1msIE",
  authDomain: "note-2501.firebaseapp.com",
  projectId: "note-2501",
  storageBucket: "note-2501.firebasestorage.app",
  messagingSenderId: "99792981221",
  appId: "1:99792981221:web:8a8c577b4b84a65cba180c",
  measurementId: "G-S9CXVCP9HH"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default  app
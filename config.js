const firebaseConfig = {
  apiKey: "AIzaSyCHd9IzUcANGbu_mcQy7a0Zgo8kB18eLmY",
  authDomain: "back-and-front.firebaseapp.com",
  projectId: "back-and-front",
  storageBucket: "back-and-front.appspot.com",
  messagingSenderId: "893589415820",
  appId: "1:893589415820:web:5fb12ac302de47e9a698a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection('Users');

module.exports = User;
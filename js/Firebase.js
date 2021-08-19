import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDM2a4aeG9HiGX3xPxVb-5PnZzeuyVjbog",
  authDomain: "recipe-book-ae065.firebaseapp.com",
  projectId: "recipe-book-ae065",
  storageBucket: "recipe-book-ae065.appspot.com",
  messagingSenderId: "135759631119",
  appId: "1:135759631119:web:7c22168cd7cc185de2a47a"
};

export default class Firebase {
  static db;

  static init() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
    Firebase.db = firebase.firestore();
  }
}

import firebase from 'firebase/app';
import 'firebase/auth';
import '@firebase/storage';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDeJsAIDghx4RJFKDPI4EaiaoF6BGjIEzs",
  authDomain: "module-uploader.firebaseapp.com",
  databaseURL: "https://module-uploader.firebaseio.com",
  projectId: "module-uploader",
  storageBucket: "module-uploader.appspot.com",
  messagingSenderId: "473286095953",
  appId: "1:473286095953:web:dab7e61dcec5d5d8b73470"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const store = firebase.firestore();
const storage = firebase.storage();

export{ auth, store, storage, firebase as default };
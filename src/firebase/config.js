import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_FER7jAJiBzrwjEdkrsAaiazrsl4I0eA",
  authDomain: "project-management-17432.firebaseapp.com",
  projectId: "project-management-17432",
  storageBucket: "project-management-17432.appspot.com",
  messagingSenderId: "1030100810549",
  appId: "1:1030100810549:web:e46383e473251911776a7c",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };

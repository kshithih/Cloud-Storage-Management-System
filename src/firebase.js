import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyBcgNuede24FuUzztz04ZICogWFShFvozA",
    authDomain: "cloud-storage-app-50fc6.firebaseapp.com",
    projectId: "cloud-storage-app-50fc6",
    storageBucket: "cloud-storage-app-50fc6.appspot.com",
    messagingSenderId: "482211968486",
    appId: "1:482211968486:web:018abbb00d56ede7ed9227"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const storage  = firebase.storage();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {db,storage,auth,provider}
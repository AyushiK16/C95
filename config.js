import firebase from 'firebase'
require('@firebase/firestore')


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDl63GhjKhINLOy9PBg2SE1cpIn_n5Zp68",
    authDomain: "scholar-s-bulletin.firebaseapp.com",
    projectId: "scholar-s-bulletin",
    storageBucket: "scholar-s-bulletin.appspot.com",
    messagingSenderId: "252676625591",
    appId: "1:252676625591:web:0bc130017d16bd7714a932"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();



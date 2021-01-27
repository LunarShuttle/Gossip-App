import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCUlo2CJB_Ycw-cqP8LLXylAQR_k_AAn1o",
    authDomain: "gossip-5c9ef.firebaseapp.com",
    projectId: "gossip-5c9ef",
    storageBucket: "gossip-5c9ef.appspot.com",
    messagingSenderId: "185008774273",
    appId: "1:185008774273:web:bd1c9983c4b2158729c180",
    measurementId: "G-2N2WHNXC4Y"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)  
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth , provider} 
import firebase from 'firebase'
import firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDW9-OI-TApbs8_pw141Rrxk7A9TvLZq9Y",
    authDomain: "pwa-blog-33cd6.firebaseapp.com",
    databaseURL: "https://pwa-blog-33cd6.firebaseio.com",
    projectId: "pwa-blog-33cd6",
    storageBucket: "pwa-blog-33cd6.appspot.com",
    messagingSenderId: "656893017027",
    appId: "1:656893017027:web:1376d7040d4ca111"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()
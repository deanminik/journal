
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDAheAO0ZGYx0v56iImJT5rDzOflQWJFYU",
    authDomain: "journalapp-5747d.firebaseapp.com",
    databaseURL: "https://journalapp-5747d.firebaseio.com",
    projectId: "journalapp-5747d",
    storageBucket: "journalapp-5747d.appspot.com",
    messagingSenderId: "956307841766",
    appId: "1:956307841766:web:39ec6b2aa4c0de18119127"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//creo mi referencia de la base de datos para grabar en la base de datos
const db = firebase.firestore();
//para poder hacer authentificacion con google 
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


//haremos la exportacion de varias cosas
export {
    db,
    googleAuthProvider,
    firebase
}
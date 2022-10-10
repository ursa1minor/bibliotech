import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD3Zjck6g0AtW3cXNX75SX6ZyEk62R6rbs",
    authDomain: "test-27b8f.firebaseapp.com",
    projectId: "test-27b8f",
    storageBucket: "test-27b8f.appspot.com",
    messagingSenderId: "295755309802",
    appId: "1:295755309802:web:7932c0d1265f01a44aed93",
    measurementId: "G-ZJMDPBLSFB"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase };
const firebase = require('firebase/app');
require('firebase/storage');
var firebaseConfig = {
    apiKey: "AIzaSyB0c2VcsjXEJj63364kIWg1M8K3b5bIT3A",
    authDomain: "blog-909d8.firebaseapp.com",
    databaseURL: "https://blog-909d8.firebaseio.com",
    projectId: "blog-909d8",
    storageBucket: "blog-909d8.appspot.com",
    messagingSenderId: "765885535773",
    appId: "1:765885535773:web:35e27e12b3a078f0c9d8f4",
    measurementId: "G-T91FQNN8DC"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
const storage = firebase.storage();

module.exports = {
  storage, firebase
}
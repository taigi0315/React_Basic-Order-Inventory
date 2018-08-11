var Rebase = require('re-base');
var firebase = require('firebase/app');
var database = require('firebase/database');

var app = firebase.initializeApp({
  apiKey: 'AIzaSyC5LTn58VzmlPZgKWImHrhd5wJEEByNwG4',
  authDomain: 'fish-app-bd454.firebaseapp.com',
  databaseURL: 'https://fish-app-bd454.firebaseio.com',
  projectId: 'fish-app-bd454'
});

var db = firebase.database(app);
var base = Rebase.createClass('https://fish-app-bd454.firebaseio.com');

export default base;
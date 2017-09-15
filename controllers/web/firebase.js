"use strict";

const firebase = require('firebase');
const moment = require('moment');

const firebaseConfig = {
  apiKey: 'AIzaSyDycRGYGxEGmudxc8py7c0yPiaORwmz8Kk',
  authDomain: 'cozyhouzz-531c2.firebaseapp.com',
  databaseURL: 'https://cozyhouzz-531c2.firebaseio.com/',
  storageBucket: 'cozyhouzz-531c2.appspot.com'
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

exports.notificationCreatePost = function (userAuthId, postIdx) {
  return firebase.auth().signInWithEmailAndPassword('vgram@vgram.co.kr', '11112222').catch(error => {
    console.log('Error while authenticating:', error);
  }).then(loginObject => {
    if (loginObject) {
      console.log('Success!!');
      // now do your thing!
      firebase.database().ref('notification/' + userAuthId).set({
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'POST',
        post: {
          ID: postIdx,
          type: 'CREATE'
        }
      });
    } else {
      console.log('Oops, something went wrong while authenticating:', loginObject);
    }
  });
};
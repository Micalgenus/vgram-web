"use strict";

const firebase = require('firebase');
const moment = require('moment');

const models = require('../../models');
const User = models.user;

const firebaseConfig = {
  apiKey: 'AIzaSyDycRGYGxEGmudxc8py7c0yPiaORwmz8Kk',
  authDomain: 'cozyhouzz-531c2.firebaseapp.com',
  databaseURL: 'https://cozyhouzz-531c2.firebaseio.com/',
  storageBucket: 'cozyhouzz-531c2.appspot.com'
};

const firebaseUserEmail = 'vgram@vgram.co.kr';
const firebaseUserPassword = '11112222';

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

exports.notificationCreatePost = function (user, post) {

  return User.findAll({
    include: [{
      model: User,
      as: 'Subscribes',
      where: {
        ID: user.ID
      }
    }],
  }).then(function (users) {
    return users.forEach(function (u) {
      const userAuthId = u.auth0_user_id;
      return firebase.auth().signInWithEmailAndPassword(firebaseUserEmail, firebaseUserPassword).catch(error => {
        console.log('Error while authenticating:', error);
      }).then(loginObject => {
        if (loginObject) {
          return firebase.database().ref(['/notification', userAuthId, moment().utc().format('YYYYMMDDHHmmssSSS')].join('/')).set({
            type: 'POST.CREATE',
            post: {
              ID: post.ID,
            }
          });
        } else {
          console.log('Oops, something went wrong while authenticating:', loginObject);
        }
      });
    });
  });
};

exports.getNotificationByUserIdx = function (userIdx) {
  return User.findOne({
    where: {
      ID: userIdx
    }
  }).then(function (u) {
    const userAuthId = u.auth0_user_id;

    return firebase.auth().signInWithEmailAndPassword(firebaseUserEmail, firebaseUserPassword).catch(error => {
      console.log('Error while authenticating:', error);
    }).then(loginObject => {
      if (loginObject) {
        return firebase.database().ref(['/notification', userAuthId].join('/')).once('value').then(function (snapshot) {
          return snapshot.val();
        });
      } else {
        console.log('Oops, something went wrong while authenticating:', loginObject);
      }
    });
  });
}
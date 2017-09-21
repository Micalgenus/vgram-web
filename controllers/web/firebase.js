"use strict";

const firebase = require('firebase');
const admin = require("firebase-admin");
const moment = require('moment');

const models = require('../../models');
const User = models.user;

const firebaseConfig = {
  apiKey: 'AIzaSyDycRGYGxEGmudxc8py7c0yPiaORwmz8Kk',
  authDomain: 'cozyhouzz-531c2.firebaseapp.com',
  databaseURL: 'https://cozyhouzz-531c2.firebaseio.com/',
  storageBucket: 'cozyhouzz-531c2.appspot.com'
};

const firebaseAdminConfig = {
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "cozyhouzz-531c2",
    private_key_id: "008f24d2f9bac5b3dd136478f78674e8d35a33d1",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCFZMjZGJSwTDBS\nJm3uzPl5CYd+nKxpr+vvsAro/mTwm32dJy2g2+ja0QZe5caDfMtfzkroTOkw3ABb\nCubAqAKxTJc32mpfqV49nZ60Ecp8ezUtYqXoDB2bav+fWIChpEjayFaqHxeRBRKr\n3tSLZS4e3ZOw0+oZ4HU7d21RlJWpWaX6/AIdn9myX5AeuyfBwt0oG6mU4aH21ODy\nwUthmX+HDwsxHf7hWOEsc/hFwX84y4OUAvTX9F6FgJa83CWNQf6TEWsUaJFPsv9j\nL6Ph5+VUlbH7Y7I5TQQw86XCKmG8EuKhFYUf298HDpSvTn3Emg8WjFdLx2/abLZG\nJ9LlQil1AgMBAAECggEAEr62cLeBEYMrWSf4U9HvDsC1jyfCHLnxfEWvSs2Q7rTT\nApYCVfQBNVqhPA2rB0gupiBtq1Y/gLOxwxl1ksYpVrPuHhWt1BKPYTY4mpJTc4m2\nz9FoggLN2EzBbil4Lf7RlBkKAK8M1z6wwIE4Ofx2bjTx76vf3lIJ91jRfmDUZS81\ncU85Y+RAv6tmGtaBqyvWP5E+EKDmH+nSj5m9OXg5h/bwH+KyIBrHekfsumJxIOz8\n2BKB2iSlOSORD6VHi7PGXJBZK3r4LAO6Ca7fnYHgkG76lNgCvzQnUdQ879K911KG\nJrraaQxlFzBBMrcJOP6b/nr/dVRVu1SZM69Um+B0YwKBgQC6Ak08WYMRDx9h3mB3\nQO9MgQErkalFrxHsVxBuVJT//sd0S7UEGg1mH32B7TIBzHKKOB/IIYsitCZQIZQJ\nQ3/cWe1674Vq6eh5hD3upX1iYkc82/VpXYDRTcszRXUj+d+8jmhLPe9DsOPmxoN+\ntW+0pC3XEUglg76P/YDZMA+LuwKBgQC3ljSx3COo4Z+5/wNu7JxR6q3eyvIDHI1O\nqPEfOwmc5R+vDpU/I0dvEXuHMkrtZQ+4b70mYmvdPkE1/eIohPxTYyoIeLhoQ5NJ\nv2WIBuDmCRlgxCCzGB7oxB7gpX7kjhVdU7x/MrHoo4f4culhbu6d9s9cJv09Fqrp\nBj5PYzGUjwKBgE+qjrPrTpRu2q0LFlvdJuCoW/zyHQKocc+8ll/6v/pIf9qSVkwU\ncGqt0A5mrcVRcDk8wnfvzeymJcaqKwIws8GHjovZrFXXKudouTHOFT6fAw3Q03I2\nRubeH8qs0/f9nFLg11BqjWB7kZCUs1sAkIBY1P1I/JJ8s5BuLdJXoEDjAoGAQquR\nx2WirZoCX5F0tbvHqRgIvHgHG4oq5v4DUswl2Yx7zR8GpD8zmepHafmhrESfSOOL\nVX04nsgU9n6UuxJQcBf7E8iDb5nay1Vukc+trNxxEusm1ONVlkJi1EJFqsrOh235\nblgCs/FvV5KjnnaiwUr4Uwb1wFGTD7zss/fZ8ZECgYBWSBnxveP8r4KUzMpjRxrF\nudt7oW0FJELFe0Cf9H+9jhrlK8ZQ7Mk8aWMZ3aCdLnzYJRLp7CJQMGqbgttXYWzn\n65W3cjpmrRZUyOrtq/WXjKTXepMrMN+afQR04xGe2IHFhl99Kje06W/IOEoIRtLG\n4s0xvdQrm3UMOZ1KEIeePg==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-vwyvb@cozyhouzz-531c2.iam.gserviceaccount.com",
    client_id: "100498669982585527983",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://accounts.google.com/o/oauth2/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vwyvb%40cozyhouzz-531c2.iam.gserviceaccount.com"
  }),
  databaseURL: "https://cozyhouzz-531c2.firebaseio.com"
};

const firebaseUserEmail = 'vgram@vgram.co.kr';
const firebaseUserPassword = '11112222';
const firebaseUserUID = 'uvpSPuxGpfhehnM30vNVP7j7Y6E3';

firebase.initializeApp(firebaseConfig);
admin.initializeApp(firebaseAdminConfig);
const db = firebase.database();


exports.getAdminAuthToken = function () {
  return admin.auth().createCustomToken(firebaseUserUID)
    .then(function (customToken) {
      return customToken;
    })
    .catch(function (error) {
      console.log("Error creating custom token:", error);
      return null;
    });
}

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
          return db.ref(['/notification', userAuthId, moment().utc().format('YYYYMMDDHHmmssSSS')].join('/')).set({
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
        return db.ref(['/notification', userAuthId].join('/')).once('value').then(function (snapshot) {
          return snapshot.val();
        });
      } else {
        console.log('Oops, something went wrong while authenticating:', loginObject);
      }
    });
  });
}

exports.deleteNotificationByDate = function (date, userIdx) {
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
        return db.ref(['/notification', userAuthId, date].join('/')).once('value').then(function (snapshot) {
          return snapshot.ref.remove();
        });
      } else {
        console.log('Oops, something went wrong while authenticating:', loginObject);
      }
    });
  });
}
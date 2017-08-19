'use strict'
/**
 * Created by KIMSEONHO on 2016-11-12.
 * setting sequelize test database, in tests/data folder.
 */
const _ = require('lodash');
var path = require('path');
var scriptName = path.basename(__filename);

var request = require('request');
var requestp = require('request-promise');

var config = require('../config/main');

const log = require('console-log-level')({
  prefix: function () {
    return new Date().toISOString() + ", " + scriptName;
  },
  level: 'debug'
});

var models = require("../models");

function getAllUserInfoByAuth0() {

  var options = {
    method: 'POST',
    url: config.auth0.ISSUER + 'oauth/token',
    headers: { 'content-type': 'application/json' },
    body: {
      grant_type: 'client_credentials',
      client_id: config.auth0.CLIENT_ID,
      client_secret: config.auth0.CLIENT_SECRET,
      audience: config.auth0.IDENTIFIER
    },
    json: true
  };

  // console.log(config);
  return requestp(options).then(function (body) {
    // console.log(body);
    return getUserInfoByAuth0(0, body.access_token).then(function (u) { return u; });
  });

}

function getUserInfoByAuth0(idx, token) {

  let args = {
    method: 'GET',
    uri: config.auth0.IDENTIFIER + 'users',
    qs: {
      'per_page': 1,
      'page': idx
    },

    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  }

  return requestp(args).then(function (body) {
    if (body != '[]') {
      let data = JSON.parse(body)[0];

      let u = {
        ID: data.app_metadata.ID,
        email: data.email,
        password: 'PASSWORD',
        member_type: data.app_metadata.roles[0],
        nickname: data.user_metadata.nickname,
        user_status: data.app_metadata.user_status,
        telephone: data.user_metadata.telephone,
        createdAt: data.created_at,
        locale: data.user_metadata.locale,
        // activation_key:
        profile_image_path: data.user_metadata.profile_image_path,
        updatedAt: data.app_metadata.updated_at,
        meta_value: {
          registered_number: data.user_metadata.registered_number,
          address: {
            post_code: data.user_metadata.address.post_code,
            addr1: data.user_metadata.address.addr1,
            addr2: data.user_metadata.address.addr2,
          },
          point: data.app_metadata.point,
          // owner_name: "김선호",
          // business_type: "LANDLORD",
          // comment: "환영합니다 ^^",
          phone_number: data.user_metadata.phone_number,
        }
      }

      let user = [u];
      return getUserInfoByAuth0(idx + 1, token).then(function (p) {
        if (p == '[]') {
          return user;
        }

        for (var i = 1; i <= p.length; i++) {
          user[i] = p[i - 1];
        }

        return user;
      });
    }

    return body;
  });
}

module.exports = function (testDB) {
  if (testDB) {

    testDB["user"] = [];

    return getAllUserInfoByAuth0().then(function (u) {
      testDB["user"] = u;
      // Foreign Key 때문에 입력 순서대로 넣어야한다.
      var modelnames = ["user", "user_meta", "post", "post_meta", "attached", "media", "room", "post_media_relationship",
        "post_attached_relationship", "user_post_relationship", "user_user_relationship", "user_post_like_relationship",
        "hash_table", "icl_translation", "coordinate", "address", "tag", "tag_relationship", "comment"];

      return models.sequelize.Promise.each(_.map(testDB), (item, index, length) => {
        log.debug("--- " + index + " ---" + "Create Test Database : " + modelnames[index]);

        return models[modelnames[index]].bulkCreate(testDB[modelnames[index]]);
      }).then(function () {
        log.debug('Complete create Test Database');
        return models.sequelize.Promise.resolve('Complete create Test Database');
      }).catch(function (err) {
        log.debug('create Test Database Error ' + err);
        return models.sequelize.Promise.reject(err);
      });
    });

  } else {
    return models.sequelize.Promise.reject('no testDB is found');
  }
}

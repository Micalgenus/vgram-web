/**
 * Created by HAN on 2017-01-19.
 */

"use strict";

const models = require('../../models');
const Users = models.users;

exports.bizList = function(req, res, next) {

  return Users.findAll({
    where: {
      member_type: "BUSINESS"
    }
  }).then(function(users) {
    var bizUser = [];
    users.forEach(function(user) {
      var tmpUser = {};

      let image = user.profile_image_path;
      if (!image.match(/^https?:\/\//)) {
        image = "http://localhost:3000/" + image;
      }

      tmpUser['name'] = user.display_name;
      tmpUser['image'] = image;
      tmpUser['intro'] = JSON.parse(user.meta_value).intro_comment;

      bizUser.push(tmpUser);
    });

    return res.render('bizList/bizlist', {
      ENV: req.env,
      logined: req.logined,
      title: '업체 목록 조회',
      users: bizUser,
    });
  }).catch(function(err) {
    return next(err);
  });

  
}
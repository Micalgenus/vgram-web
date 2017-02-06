/**
 * Created by HAN on 2017-01-19.
 */

"use strict";

const models = require('../../models');
const Users = models.users;


exports.bizList = function(req, res, next) {
   console.log(req.user);
   console.log(typeof models.users);

  return res.render('bizList/bizlist', {
    ENV: req.env,
    logined: req.logined,
    title: '로그인',
     //
     // id: req.user.ID,
     // name: req.user.display_name,
     // email: req.user.email,
     // phone: req.user.telephone,
     // image: req.user.profile_image_path,
     // register: req.user.registered_date
     // 경수야 여기좀 ㅋㅋㅋㅋㅋ

  });
}



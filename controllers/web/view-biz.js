/**
 * Created by HAN on 2017-01-19.
 */

"use strict";

const models = require('../../models');
const User = models.user;

exports.bizList = function(req, res, next) {

  let page = (req.query.page ? req.query.page : 1);

  return User.count({
    where: {
      member_type: "BUSINESS"
    }
  }).then(function(member_count) {

    let count = (req.query.pageSize ? req.query.pageSize : 20);
    let last_page = parseInt(member_count / count) + 1;
    var index = (count * (page - 1));

    // 잘못된 요청일 경우 넘어감
    if (page > last_page) {
      let size = req.query.pageSize ? '&pageSize=' + count.toString() : '';
      return res.redirect('/biz?page=' + last_page.toString() + size);
    }
    if (page < 1) {
      let size = req.query.pageSize ? '?pageSize=' + count.toString() : '';
      return res.redirect('/biz' + size);
    }

    return User.findAll({
      where: {
        member_type: "BUSINESS"
      },
      limit: count,
      offset: index,
      order: '`ID` DESC'
    }).then(function(users) {
      var bizUser = [];
      users.forEach(function(user) {
        var tmpUser = {};

        // 임시
        let image = user.profile_image_path;
        if (!image.match(/^https?:\/\//)) {
          image = "http://localhost:3000/" + image;
        }

        tmpUser['id'] = user.ID;
        tmpUser['name'] = user.display_name;
        tmpUser['image'] = image;
        tmpUser['intro'] = JSON.parse(user.meta_value).intro_comment;

        bizUser.push(tmpUser);
      });

      return res.render('bizList/bizlist', {
        ENV: req.env,
        logined: req.logined,
        msg: req.msg,
        title: '업체 목록 조회',
        now_page: page,
        last_page: last_page,
        users: bizUser,
      });
    }).catch(function(err) {
      return next(err);
    });
  });
}

exports.bizDetail = function(req, res, next) {

  return User.findOne({
    where: {
      ID: req.params.idx,
      member_type: "BUSINESS"
    }
  }).then(function(user) {
    if (!user) {
    req.flash('msg', '조회할 수 없는 회원입니다.');
      return res.redirect('/biz');
    }

    var business_type;

    let meta = JSON.parse(user.meta_value);
    if (meta.business_type) business_type = meta.business_type;
    return res.render('bizList/bizDetail', {
      ENV: req.env,
      logined: req.logined,
      title: '업체 정보 상세보기',
      display_name: user.display_name,
      preview: user.profile_image_path,
      business_type: business_type,
      build_type: "sort of build???"
    });
  });
}

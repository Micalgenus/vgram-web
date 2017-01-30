/**
 * Created by KIMSEONHO on 2017-01-10.
 */

"use strict";

const auth = require('../core/authentication');

const models = require('../../models');
const Users = models.users;

/**
 * show login view if not login(no sessio
 * @param req
 * @param res
 * @param next
 * @returns {String}
 */

exports.login = function(req, res, next) {

  // 로그인이 되어있으면 로그인을 하지 않고 redirect 시킴(jwt 확인)
  let token = req.cookies.Authorization;

  if (token) {
    req.flash('msg', '이미 로그인 하셨습니다.');
    return res.redirect('/');
  }

  // 사용자 입력 확인
  if (! req.body.email) {
    req.flash('msg', '이메일을 입력해 주십시오.');
    return res.redirect('/login');
  }

  if (! req.body.password) {
    req.flash('email', req.body.email);
    req.flash('msg', '패스워드를 입력해 주십시오.');
    return res.redirect('/login');
  }

  return next();
}

exports.logout = function(req, res, next) {
  let token = req.cookies.Authorization;

  if (!token) {
    req.flash('msg', '로그인을 해주십시오.');
    return res.redirect('/login');
  }
  
  res.clearCookie('Authorization');

  return next();
}

exports.signup = function (req, res, next) {

  // 로그인이 되어있으면 회원가입 하지 않고 redirect 시킴(jwt 확인)
  let token = req.cookies.Authorization;

  if (token) {
    req.flash('msg', '이미 로그인 하셨습니다.');
    return res.redirect('/');
  }

  let type = req.body.member_type;
  let email = req.body.email;
  let phone = req.body.phone;

  req.flash('check', type);
  req.flash('email', email);
  req.flash('phone', phone);

  if (type != "PUBLIC" && type != "BUSINESS") {
    req.flash('msg', '잘못된 유형의 회원입니다.');
    return res.redirect('/signup');
  }

  if (!email) {
    req.flash('msg', '이메일을 입력해 주십시오.');
    return res.redirect('/signup');
  }

  if (!email.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)) {
    req.flash('msg', '올바른 이메일 형식을 사용해 주시길 바랍니다.');
    return res.redirect('/signup');
  }

  let password = req.body.password;
  let repassword = req.body.repassword;
  if (!password || !repassword) {
    req.flash('msg', '비밀번호를 입력해 주시길 바랍니다.');
    return res.redirect('/signup');
  }

  if (password != repassword) {
    req.flash('msg', '비밀번호가 일치하지 않습니다.');
    return res.redirect('/signup');
  }

  if (type == "BUSINESS") {
    let phone = req.body.phone;
    if (!phone) {
      req.flash('msg', '전화번호를 입력해 주십시오.');
      return res.redirect('/signup');
    }
  }

  return res.send(req.body);
}

/*
exports.register = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const password = req.body.password;
  const memberType = _.toNumber(req.body.memberType);

  // Return error if no email provided
  if (!email) {
    return res.status(400).send({
      errorMsg: 'You must enter an email address.',
      statusCode: -1
    });
  }

  // Return error if no password provided
  if (!password) {
    return res.status(400).send({ errorMsg: 'You must enter a password.', statusCode: -1 });
  }

  return Member.findOne({
    where: {
      email: email
    }
  }).then(function(existingUser) {
    // If user is not unique, return error
    if (existingUser) {   // 현 확인방법이 맞는지 확인해야함.
      return res.status(400).send({
        errorMsg: 'That email address is already in use.',
        statusCode: 2
      });
    }

    // If email is unique and password was provided, create account
    let user = {
      email: email,
      password: password,
      memberType: memberType
    };

    if (_.eq(memberType, BIZMEMBER) || _.eq(memberType, value.memberType.LEASE_MEMBER)) {    // biz회원 가입시, transaction 때문에 나눠놨음
      return models.sequelize.transaction(function (t) {
        return Member.create(user, {transaction: t}).then(function(newUser) {
          // Subscribe member to Mailchimp list
          // mailchimp.subscribeToNewsletter(user.email);

          // Respond with JWT if user was created
          newUser.passwordOrigin = password;    // 인코딩 전의 패스워드 저장
          let userInfo = genToken.setUserInfo(newUser);

          let bizMember = {
            memberIdx: newUser.idx
          };

          return BusinessMember.create(bizMember, {transaction: t}).then(function(user) {
            return models.sequelize.Promise.resolve(userInfo);
          });
        })
      }).then(function(userInfo) {    // commit구간
        return res.status(201).json({
          id_token: 'JWT ' + genToken.generateUserToken(userInfo),
          user: userInfo,
          status: 1
        });
      }).catch(function(err) {    // end sequelize.transaction, rollback구간
        if (err) {
          res.status(422).json({ errorMsg: 'Internal Error', statusCode: 9 });
          return next(err);
        }
      });
    } else {    // 일반 회원 가입시
      Member.create(user).then(function(newUser) {
        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created
        newUser.passwordOrigin = password;    // 인코딩 전의 패스워드 저장
        let userInfo = genToken.setUserInfo(newUser);

        return res.status(201).json({
          id_token: 'JWT ' + genToken.generateUserToken(userInfo),
          user: userInfo,
          status: 1
        });

      }).catch(function(err) {    // end Member.create
        if (err) {
          res.status(422).json({ errorMsg: 'Internal Error', statusCode: 9 });
          return next(err);
        }
      });
    }
  }).catch(function(err) {    // end Member.findOne
    if (err) { return next(err); }
  });
}
*/

exports.change = function(req, res, next) {
  const email = req.user.email;
  if (req.body.email && req.user.email != req.body.email) {
    req.flash('msg', 'test');
    return res.redirect('/change');
  }

  return Users.update({
    telephone: req.body.phone,
    display_name: req.body.name
  }, {
    where: {
      email: email
    }
  }).then(function(array) {
    if (array[0] == 1) {

      return Users.findOne({
        where: {
          email: email
        }
      }).then(function(user) {
        req.user = user.dataValues;
        return next();
      }).catch(function(err) {
        return res.send(err);
      });
    } else {
      req.flash('msg', '변경에 실패하였습니다.');
      return res.redirect('/change');
    }
  }).catch(function(err) {
    return res.send(err);
  });
}

exports.quit = function (req, res, next){

}

exports.setToken = function(req, res, next) {

  let result = auth.login(req, res);

  // header와 cookies에 id_token을 붙여서 전송
  res.clearCookie('Authorization');
  res.cookie('Authorization', result.id_token);

  return next();
}

exports.init = function(req, res, next) {
  req.env = process.env.NODE_ENV || "development";
  req.logined = (req.cookies.Authorization ? true : false);

  return next();
}

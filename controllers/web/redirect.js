/**
 * Created by JHLee on 2017-01-17.
 */

"use strict";

const auth = require('../core/authentication');

exports.redirectMain = function(req, res) {
  // Main으로 Redirect
  return res.redirect('/');
}

exports.redirectChange = function(req, res) {
  // Change페이지로 Redirect
  return res.redirect('/user/change');
}

exports.redirectBizList = function(req, res) {
  return res.redirect('/biz/1');
}

exports.redirectPrevPath = function(req, res) {
   const prevPath = req.flash("prevPath");

   if (prevPath) {
      return res.redirect(prevPath);
   } else {
      return redirectMain(req, res);
   }
}

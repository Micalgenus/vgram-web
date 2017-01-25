/**
 * Created by HAN on 2017-01-19.
 */

"use strict";

exports.bizList = function(req, res, next) {
  return res.render('bizList/bizlist', {
    ENV: req.env,
    logined: req.logined,
    title: '로그인',
    test: "TestTest123123"
  });
}
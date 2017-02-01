/**
 * Created by HAN on 2017-01-19.
 */

"use strict";

exports.bizList = function(req, res, next) {
  return res.render('bizList/bizlist', {
    ENV: req.env,
    logined: req.logined,
    title: '로그인',
    display: "display_Test1",
    preview: "preview_image_test2",
    intro_test: "intro_test"

  });
}

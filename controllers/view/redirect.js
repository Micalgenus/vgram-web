/**
 * Created by JHLee on 2017-01-17.
 */

"use strict";

const auth = require('../core/authentication');

exports.redirectMain = function(req, res) {
  // Main으로 Redirect

  return res.redirect('/');
}
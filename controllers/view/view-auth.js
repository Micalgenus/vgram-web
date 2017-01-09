/**
 * Created by KIMSEONHO on 2017-01-10.
 */

/**
 * show login view if not login(no sessio
 * @param req
 * @param res
 * @param next
 * @returns {String}
 */
exports.login = function(req, res, next) {
   // 로그인이 되어있으면 로그인을 하지 않고 redirect 시킴(jwt 확인);

   return res.render("login");
}

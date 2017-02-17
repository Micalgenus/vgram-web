// /**
//  * Created by KIM on 2017-01-26.
//  */
//
// "use strict";
//
// exports.bizDetail = function(req, res, next) {
//    return res.render('bizDetail/bizdetail', {
//       ENV: req.env,
//       logined: req.logined,
//       title: '로그인',
//       display: "display_Test1",
//       preview: "preview_image_test2"
//    });
// }



"use strict";

exports.roomList = function(req, res, next) {
   return res.render('roomList/room', {
      ENV: req.env,
      logined: req.logined,
      title: '로그인',
      display_title: "title of business",
      preview: "preview_image_test2",
      business_type: "Let introduce type of the business",
      build_type:"sort of build"

      // 요기도
   });
}

/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");

//------------------------------------------
// users_meta table
//------------------------------------------
module.exports = [
   {
      ID: 1,
      user_id: 5,    // 일반 회원
      meta_key: "metas",
      meta_value: {
         attached: [1, 2, 3]     // attached 기본 ID
      }
   }
]

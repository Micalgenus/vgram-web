/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");

//------------------------------------------
// user_user_relationship table
//------------------------------------------
module.exports = [
   {
      user_id: 1,
      user_target_id: 2
   },
   {
      user_id: 1,
      user_target_id: 3
   },
   {
      user_id: 1,
      user_target_id: 4
   },
   {
      user_id: 2,
      user_target_id: 1
   },
   {
      user_id: 2,
      user_target_id: 3
   },
   {
      user_id: 3,
      user_target_id: 4
   },
   {
      user_id: 4,
      user_target_id: 5
   },
   {
      user_id: 4,
      user_target_id: 6
   },
   {
      user_id: 4,
      user_target_id: 7
   },
   {
      user_id: 5,
      user_target_id: 7
   },
   {
      user_id: 6,
      user_target_id: 1
   },
   {
      user_id: 7,
      user_target_id: 2
   }
]

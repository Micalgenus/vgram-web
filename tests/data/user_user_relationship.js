/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");
var userData = require('./user');
var _ = require("lodash");
var postData = require('./post');
//------------------------------------------
// user_user_relationship table
//------------------------------------------
let relationdata = [
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
// relationdata = _.map(userData, function (user, i) {
  
//     for (var user of userData) {
        
//         return {
//             user_id: user.ID,
//             user_target_id: user.ID+1
//         };
//         // if (!_.find(data, tmp)) {
//         //     data.push(tmp);
//         // }
//     }
// });


module.exports = relationdata;
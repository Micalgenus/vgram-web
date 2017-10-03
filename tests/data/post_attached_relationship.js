"use strict";

/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");

//------------------------------------------
// post_attached_relationship table
//------------------------------------------
module.exports = [
   {
      post_id: 1,
      attached_id: 1
   },
   {
      post_id: 1,
      attached_id: 2
   },
   {
      post_id: 2,
      attached_id: 3
   },
   {
      post_id: 2,
      attached_id: 4
   }
]

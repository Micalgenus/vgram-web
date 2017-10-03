/**
 * Created by KIMSEONHO on 2016-09-02.
 */
"use strict";

var moment = require('moment');
moment.locale("ko");

//------------------------------------------
// attached table
//------------------------------------------
module.exports = [
   {
      ID: 1,
      user_id: 5,
      group: "5852a2215fa82",
      type: "zip",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "attached/sinho0689@gmail.com",
      file_name: "addrlinkSample_2017012612.zip",
      meta_value: {}
   },
   {
      ID: 2,
      user_id: 5,
      group: "5852a2215fa82",
      type: "wma",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "attached/sinho0689@gmail.com",
      file_name: "jeonju_song_201701261354.wma",
      meta_value: {}
   },
   {
      ID: 3,
      user_id: 5,
      group: "5852a22123667aas",
      type: "png",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "attached/sinho0689@gmail.com",
      file_name: "wordpress-dberdiagram.png",
      meta_value: {}
   },
   {
      ID: 4,
      user_id: 5,
      group: "5852a22123667aas",
      type: "pdf",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "attached/sinho0689@gmail.com",
      file_name: "연수과정안내_2017012316.pdf",
      meta_value: {}
   }
]

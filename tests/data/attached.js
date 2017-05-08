/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");

//------------------------------------------
// attached table
//------------------------------------------
module.exports = [
   {
      ID: 1,
      user_id: 1,
      group: "5852a2215fa82",
      type: "zip",
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "attached",
      file_name: "addrlinkSample_2017012612.zip",
      meta_value: {}
   },
   {
      ID: 2,
      user_id: 2,
      group: "5852a2215fa82",
      type: "wma",
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "attached",
      file_name: "jeonju_song_201701261354.wma",
      meta_value: {}
   },
   {
      ID: 3,
      user_id: 3,
      group: "5852a22123667aas",
      type: "png",
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "attached",
      file_name: "wordpress-dberdiagram.png",
      meta_value: {}
   },
   {
      ID: 4,
      user_id: 4,
      group: "5852a22123667aas",
      type: "pdf",
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "attached",
      file_name: "연수과정안내_2017012316.pdf",
      meta_value: {}
   }
]

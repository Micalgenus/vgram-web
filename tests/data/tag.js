/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");

//------------------------------------------
// tag table
//------------------------------------------
   module.exports = [
   {
      ID: 1,
      name: "전북대",
      tagging_count: 6,
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss')
   },
   {
      ID: 2,
      name: "바나나는맛있다",
      tagging_count: 4,
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss')
   },
   {
      ID: 3,
      name: "공지사항",
      tagging_count: 2,
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss')
   },
   {
      ID: 4,
      name: "이벤트",
      tagging_count: 2,
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss')
   }
]

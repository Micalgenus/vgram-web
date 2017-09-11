/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");

//------------------------------------------
// icl_translation table
// (post 테이블 갯수만큼 존재해야한다)
//------------------------------------------
var data = [
   {
      ID: 1,
      element_id: 1,
      element_type: "room",
      group_id: 1,      // 신규 작성시 group_id = ID
      language_code: "ko-kr",
      original_language_code: null
   },
   {
      ID: 2,
      element_id: 2,
      element_type: "room",
      group_id: 2,
      language_code: "ko-kr",
      original_language_code: null
   },
   {
      ID: 3,
      element_id: 3,
      element_type: "room",
      group_id: 3,
      language_code: "ko-kr",
      original_language_code: null
   },
   {
      ID: 4,
      element_id: 4,
      element_type: "room",
      group_id: 4,
      language_code: "ko-kr",
      original_language_code: null
   },
   {
      ID: 5,
      element_id: 5,
      element_type: "room",
      group_id: 5,
      language_code: "ko-kr",
      original_language_code: null
   },
   {
      ID: 6,
      element_id: 6,
      element_type: "room",
      group_id: 6,
      language_code: "ko-kr",
      original_language_code: null
   },
   {
      ID: 7,
      element_id: 7,
      element_type: "room",
      group_id: 7,
      language_code: "ko-kr",
      original_language_code: null
   },
   {
      ID: 8,
      element_id: 8,
      element_type: "room",
      group_id: 8,
      language_code: "ko-kr",
      original_language_code: null
   },
   {
      ID: 9,
      element_id: 9,
      element_type: "room",
      group_id: 9,
      language_code: "ko-kr",
      original_language_code: null
   },
   {
      ID: 10,
      element_id: 10,
      element_type: "room",
      group_id: 10,
      language_code: "ko-kr",
      original_language_code: null
   }
   // {
   //    ID: 11,
   //    element_id: 11,
   //    element_type: "post",
   //    group_id: 11,
   //    language_code: "ko-kr",
   //    original_language_code: null
   // },
   // {
   //    ID: 12,
   //    element_id: 12,
   //    element_type: "post",
   //    group_id: 12,
   //    language_code: "ko-kr",
   //    original_language_code: null
   // },
   // {
   //    ID: 13,
   //    element_id: 13,
   //    element_type: "post",
   //    group_id: 13,
   //    language_code: "ko-kr",
   //    original_language_code: null
   // },
   // {
   //    ID: 14,
   //    element_id: 14,
   //    element_type: "post",
   //    group_id: 14,
   //    language_code: "ko-kr",
   //    original_language_code: null
   // }
];

for (i = 0; i < 30; i++) {  // room 관련 test 데이터 30개 생성
   var tmp = {
      ID: i + 1,
      element_id: i + 1,
      element_type: "post",
      group_id: i + 1,
      language_code: "ko-kr",
      original_language_code: null
   }

   data[i] = tmp;
}

for (i = 30; i < 34; i++) {  // post(공지사항, 이벤트) 관련 test 데이터 4개 생성
   var tmp = {
      ID: i + 1,
      element_id: i + 1,
      element_type: "post",
      group_id: i + 1,
      language_code: "ko-kr",
      original_language_code: null
   }

   data[i] = tmp;
}

module.exports = data;

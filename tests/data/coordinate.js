"use strict";

/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");

//------------------------------------------
// coordinate table
//------------------------------------------
module.exports = [
   {
      ID: 1,
      translation_group_id: 1,
      region_code: "4511310500",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      lat: 35.844225,
      lng: 127.129278,
   },
   {
      ID: 2,
      translation_group_id: 2,
      region_code: "4511310700",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      lat: 35.840610,
      lng: 127.121827,
   },
   {
      ID: 3,
      translation_group_id: 3,
      region_code: "4511112900",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      lat: 35.829829,
      lng: 127.114363,
   },
   {
      ID: 4,
      translation_group_id: 4,
      region_code: "4511310500",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      lat: 35.840012,
      lng: 127.120878,
   },
   {
      ID: 5,
      translation_group_id: 5,
      region_code: "4511310500",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      lat: 35.837298,
      lng: 127.121725,
   },
   {
      ID: 6,
      translation_group_id: 6,
      region_code: "4511310600",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      lat: 35.847955,
      lng: 127.115282,
   },
   {
      ID: 7,
      translation_group_id: 7,
      region_code: "4511312100",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      lat: 35.853750,
      lng: 127.117475,
   },
   {
      ID: 8,
      translation_group_id: 8,
      region_code: "4511312100",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      lat: 35.854101,
      lng: 127.119145,
   },
   {
      ID: 9,
      translation_group_id: 9,
      region_code: "4511312100",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      lat: 35.855549,
      lng: 127.117991,
   },
   {
      ID: 10,
      translation_group_id: 10,
      region_code: "4511312100",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      lat: 35.860233,
      lng: 127.119235,
   },

   // 테스트를 위한 추가
   // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
   // ex> 여행 투어, 체인점 안내등
   {
      ID: 11,
      translation_group_id: 11,
      region_code: "4511310500",
      lat: 35.8409280,
      lng: 127.1311890,
   },
   {
      ID: 12,
      translation_group_id: 12,
      region_code: "4511312200",
      lat: 35.8522040,
      lng: 127.1193240,
   },
   {
      ID: 13,
      translation_group_id: 13,
      region_code: "4511313300",
      lat: 35.8638460,
      lng: 127.1022310,
   },
   {
      ID: 14,
      translation_group_id: 14,
      region_code: "4511312200",
      lat: 35.8684550,
      lng: 127.1143570,
   },
   {
      ID: 15,
      translation_group_id: 15,
      region_code: "4511312300",
      lat: 35.8754940,
      lng: 127.0737890,
   },
   {
      ID: 16,
      translation_group_id: 16,
      region_code: "4511312600",
      lat: 35.8745340,
      lng: 127.0335980,
   },
   {
      ID: 17,
      translation_group_id: 17,
      region_code: "4514012200",
      lat: 35.9514490,
      lng: 126.9679910,
   },
   {
      ID: 18,
      translation_group_id: 18,
      region_code: "4514012200",
      lat: 35.9561140,
      lng: 126.9671980,
   },
   {
      ID: 19,
      translation_group_id: 19,
      region_code: "4514012000",
      lat: 35.9590810,
      lng: 126.9533890,
   },
   {
      ID: 20,
      translation_group_id: 20,
      region_code: "4514011900",
      lat: 35.9651470,
      lng: 126.9446770,
   },
   {
      ID: 21,
      translation_group_id: 21,
      region_code: "4514012000",
      lat: 35.9774180,
      lng: 126.9482740,
   },
   {
      ID: 22,
      translation_group_id: 22,
      region_code: "4514013200",
      lat: 35.9813480,
      lng: 126.9736610
   },
   {
      ID: 23,
      translation_group_id: 23,
      region_code: "4514013300",
      lat: 35.9914650,
      lng: 126.9672270
   },
   {
      ID: 24,
      translation_group_id: 24,
      region_code: "4514013300",
      lat: 35.9914650,
      lng: 126.9672270
   },
   {
      ID: 25,
      translation_group_id: 25,
      region_code: "4514032022",
      lat: 36.0036910,
      lng: 126.9385720
   },
   {
      ID: 26,
      translation_group_id: 26,
      region_code: "4513014200",
      lat: 35.9655530,
      lng: 126.7273710
   },
   {
      ID: 27,
      translation_group_id: 27,
      region_code: "4513014200",
      lat: 35.9650020,
      lng: 126.7234540
   },
   {
      ID: 28,
      translation_group_id: 28,
      region_code: "4513014200",
      lat: 35.9693350,
      lng: 126.7180380
   },
   {
      ID: 29,
      translation_group_id: 29,
      region_code: "4513013300",
      lat: 35.9733570,
      lng: 126.7137920
   },
   {
      ID: 30,
      translation_group_id: 30,
      region_code: "4513013300",
      lat: 35.9746540,
      lng: 126.7125650
   }
];

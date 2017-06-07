/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
var value = require('../../utils/staticValue');
var _ = require('lodash');
moment.locale("ko");

//------------------------------------------
// room table
//------------------------------------------
var data = [
   {
      ID: 1,
      post_id: 1,
      room_type: "ONE_ROOM",
      post_code: "54922",
      deposit: 200,     // 만원
      monthly_rent_fee: 25,      // 만원
      area_size: 10,    // 평
      meta_value: {
         options: ["심야전기"]
      }
   },
   {
      ID: 2,
      post_id: 2,
      room_type: "ONE_ROOM",
      post_code: "54922",
      deposit: 100,     // 만원
      monthly_rent_fee: 25,      // 만원
      area_size: 10,    // 평
      meta_value: {
         options: ["심야전기"]
      }
   },
   {
      ID: 3,
      post_id: 3,
      room_type: "ONE_ROOM",
      post_code: "54922",
      deposit: 100,     // 만원
      monthly_rent_fee: 25,      // 만원
      area_size: 10,    // 평
      meta_value: {
         options: ["심야전기"]
      }
   },
   {
      ID: 4,
      post_id: 4,
      room_type: "ONE_ROOM",
      post_code: "54922",
      deposit: 100,     // 만원
      monthly_rent_fee: 25,      // 만원
      area_size: 10,    // 평
      meta_value: {
         options: ["심야전기"]
      }
   },
   {
      ID: 5,
      post_id: 5,
      room_type: "ONE_ROOM",
      post_code: "54922",
      deposit: 100,     // 만원
      monthly_rent_fee: 25,      // 만원
      area_size: 10,    // 평
      meta_value: {
         options: ["심야전기"]
      }
   },
   {
      ID: 6,
      post_id: 6,
      room_type: "ONE_ROOM",
      post_code: "54922",
      deposit: 100,     // 만원
      monthly_rent_fee: 25,      // 만원
      area_size: 10,    // 평
      meta_value: {
         options: ["심야전기"]
      }
   },
   {
      ID: 7,
      post_id: 7,
      room_type: "ONE_ROOM",
      post_code: "54922",
      deposit: 100,     // 만원
      monthly_rent_fee: 25,      // 만원
      area_size: 10,    // 평
      meta_value: {
         options: ["심야전기"]
      }
   },
   {
      ID: 8,
      post_id: 8,
      room_type: "ONE_ROOM",
      post_code: "54922",
      deposit: 100,     // 만원
      monthly_rent_fee: 25,      // 만원
      area_size: 10,    // 평
      meta_value: {
         options: ["심야전기"]
      }
   },
   {
      ID: 9,
      post_id: 9,
      room_type: "ONE_ROOM",
      post_code: "54922",
      deposit: 100,     // 만원
      monthly_rent_fee: 25,      // 만원
      area_size: 10,    // 평
      meta_value: {
         options: ["심야전기"]
      }
   },
   {
      ID: 10,
      post_id: 10,
      room_type: "ONE_ROOM",
      post_code: "54922",
      deposit: 100,     // 만원
      monthly_rent_fee: 25,      // 만원
      area_size: 10,    // 평
      meta_value: {
         options: ["심야전기"]
      }
   }
];

// meta_value : {
//    shortTerm: false,    // 단기계약 가능여부
//       conditionType: ["MONTHLY", "ANNUALLY", "LEASE", "SELL"],
//    "floor": "1F"    // staticValue.floors 참고
//    "actualsize": 25,    // 평 기준
//    "manageExpense": 5,    // 만원단위, 0일 경우 없음
//    "options": ["internet","TV", "washer",  "airConditioner", "bed", "desk", "closet", "refrigerator","gasRange", "microwave", "shoeCloset"],
//    "parking": true,    // 주차가능여부
//    "elevator": false,    // 엘리베이터여부
//    "heatingType": "nightElectronic" | "cityGas"
// (난방은 심야전기 OR 도시가스 둘중 하나임)
// }

var roomType = [value.placeType.ONE_ROOM, value.placeType.TWO_ROOM,
   value.placeType.THREE_ROOM, value.placeType.APARTMENT];

var testConditionType = [
   ["MONTHLY", "ANNUALLY", "LEASE", "SELL"],
   ["MONTHLY", "ANNUALLY"],
   ["MONTHLY"],
   ["MONTHLY", "LEASE"]
]

var floors = [];
for (var prop in value.floors) {
   floors.push(value.floors[prop]);
}

var testOptions = [
   ["internet", "TV", "washer", "airConditioner", "bed", "desk", "closet", "refrigerator", "gasRange", "microwave", "shoeCloset"],
   ["internet", "washer", "airConditioner", "refrigerator", "gasRange", "shoeCloset"],
   ["internet", "TV", "washer", "airConditioner", "bed", "desk", "refrigerator", "gasRange", "microwave"],
   ["internet", "airConditioner", "bed", "desk", "closet", "refrigerator", "gasRange", "microwave", "shoeCloset"],
   ["internet", "washer", "bed", "desk", "refrigerator"]
];

for (i = 0; i < 30; i++) {  // ROOM 관련 test 데이터 30개 생성
   var tmp = {
      ID: i + 1,
      post_id: i + 1,
      room_type: roomType[i % roomType.length],
      deposit: _.random(10, 300),
      monthly_rent_fee: _.random(15, 50),
      area_size: _.random(5, 25),
      meta_value: {
         shortTerm: i%2 == 0 ? false : true,    // 단기계약 가능여부
         conditionType: testConditionType[i%testConditionType.length],
         "floor": floors[i%floors.length],    // staticValue.floors 참고
         "actualsize": _.random(4, 15),    // 평 기준
         "manageExpense": _.random(10),    // 만원단위, 0일 경우 없음
         "options": testOptions[i%testOptions.length],
         "parking": i%2 == 0 ? false : true,    // 주차가능여부
         "elevator": i%2 == 0 ? true : true,    // 엘리베이터여부
         "heatingType": i%2 == 0 ? "nightElectronic" : "cityGas"
      }
   };

   data[i] = tmp;
}

module.exports = data;

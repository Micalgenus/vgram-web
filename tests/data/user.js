/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");

var value = require("../../utils/staticValue");

//------------------------------------------
// user table
//------------------------------------------
module.exports = [
   {
      ID: 1,
      email: "kcmin08@naver.com",    // 일반 회원
      password: "$2a$05$Ak0Z3z7ntwuAAGwr75XoiO2aYO.d1CRbkT37tOYamWXtflgk4TPO6",   // 11112222
      member_type: "PUBLIC",
      telephone: "010-3800-2109",
      registered_date: "2017-01-13",
      display_name: "김창민",
      locale: "ko_KR",
      profile_image_path: "users/profile1_20170125150101.jpg",
      updated_date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      user_status: 1,
      meta_value: {
         level: 1
      }
   },
   {
      ID: 2,
      email: "pastelbook89@gmail.com",    // 일반 회원
      password: "$2a$05$Ak0Z3z7ntwuAAGwr75XoiO2aYO.d1CRbkT37tOYamWXtflgk4TPO6",   // 11112222
      member_type: "PUBLIC",
      telephone: "010-8501-7641",
      registered_date: "2017-01-13",
      display_name: "모빌리티랩",
      locale: "ko_KR",
      profile_image_path: "users/profile2_20170125150101.jpg",
      updated_date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      user_status: 1,
      meta_value: {
         level: 2
      }
   },
   {
      ID: 3,
      email: "3333@gmail.com",    // 일반 회원
      password: "$2a$05$Ak0Z3z7ntwuAAGwr75XoiO2aYO.d1CRbkT37tOYamWXtflgk4TPO6",   // 11112222
      member_type: "PUBLIC",
      registered_date: "2017-01-13",
      telephone: "010-7676-7745",
      display_name: "조영현",
      locale: "ko_KR",
      profile_image_path: "users/profile3_20170125150101.jpg",
      updated_date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      user_status: 1,
      meta_value: {
         level: 3
      }
   },
   {
      ID: 4,
      email: "4444@gmail.com",    // 일반 회원
      password: "$2a$05$Ak0Z3z7ntwuAAGwr75XoiO2aYO.d1CRbkT37tOYamWXtflgk4TPO6",   // 11112222
      member_type: "PUBLIC",
      registered_date: "2017-01-13",
      telephone: "010-3374-7524",
      display_name: "이정현",
      locale: "ko_KR",
      profile_image_path: "users/profile1_20170125150101.jpg",
      updated_date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      user_status: 1,
      meta_value: {
         level: 4
      }
   },
   {
      ID: 5,
      email: "sinho0689@gmail.com",       // 사업주회원
      password: "$2a$05$Ak0Z3z7ntwuAAGwr75XoiO2aYO.d1CRbkT37tOYamWXtflgk4TPO6",   // 11112222
      member_type: "BUSINESS",
      registered_date: "2017-01-13",
      telephone: "010-3800-2109",
      display_name: "모랩",
      locale: "ko_KR",
      profile_image_path: "users/profile2_20170125150101.jpg",
      updated_date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      user_status: 1,
      meta_value: {
         registered_number: "418-08-80915",
         address: {
            post_code: "54869",
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한집"
         },
         level: 2,
         owner_name: "김선호",
         business_type: value.businessType.LANDLORD,
         intro_comment: "환영합니다 ^^"
      }
   },
   {
      ID: 6,
      email: "6666@gmail.com",       // 사업주회원
      password: "$2a$05$Ak0Z3z7ntwuAAGwr75XoiO2aYO.d1CRbkT37tOYamWXtflgk4TPO6",   // 11112222
      member_type: "BUSINESS",
      registered_date: "2017-01-13",
      telephone: "010-3800-2109",
      display_name: "모랩123",
      locale: "ko_KR",
      profile_image_path: "users/profile3_20170125150101.jpg",
      updated_date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      user_status: 1,
      meta_value: {
         registered_number: "418-86-95742",
         address: {
            post_code: "54869",
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한친구들"
         },
         level: 2,
         owner_name: "김선호1",
         business_type: value.businessType.ESTATE_AGENT,
         intro_comment: "환영합니다 ^^"
      }
   },
   {
      ID: 7,
      email: "7777@gmail.com",       // 사업주회원
      password: "$2a$05$Ak0Z3z7ntwuAAGwr75XoiO2aYO.d1CRbkT37tOYamWXtflgk4TPO6",   // 11112222
      member_type: "BUSINESS",
      registered_date: "2017-01-13",
      telephone: "010-3800-2109",
      display_name: "모빌모빌모빌",
      locale: "ko_KR",
      profile_image_path: "users/profile1_20170125150101.jpg",
      updated_date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      user_status: 1,
      meta_value: {
         registered_number: "418-86-95742",
         address: {
            post_code: "54869",
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한친구들"
         },
         level: 3,
         owner_name: "김선호1",
         business_type: value.businessType.LANDLORD,
         intro_comment: "환영합니다 ^^"
      }
   },
   {
      ID: 8,
      email: "8888@gmail.com",       // 사업주회원
      password: "$2a$05$Ak0Z3z7ntwuAAGwr75XoiO2aYO.d1CRbkT37tOYamWXtflgk4TPO6",   // 11112222
      member_type: "BUSINESS",
      registered_date: "2017-01-13",
      telephone: "010-3800-2109",
      display_name: "몽몽몽키키키킼",
      locale: "ko_KR",
      profile_image_path: "users/profile2_20170125150101.jpg",
      updated_date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      user_status: 0,      // 휴면계정
      meta_value: {
         registered_number: "418-86-95742",
         address: {
            post_code: "54869",
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한친구들"
         },
         level: 4,
         owner_name: "김선호1",
         business_type: value.businessType.ESTATE_AGENT,
         intro_comment: "환영합니다 ^^"
      }
   },
   {
      ID: 9,
      email: "9999@gmail.com",       // 사업주회원
      password: "$2a$05$Ak0Z3z7ntwuAAGwr75XoiO2aYO.d1CRbkT37tOYamWXtflgk4TPO6",   // 11112222
      member_type: "BUSINESS",
      registered_date: "2017-01-13",
      telephone: "010-3800-2109",
      display_name: "몽키1",
      locale: "ko_KR",
      profile_image_path: "users/profile3_20170125150101.jpg",
      updated_date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      user_status: -1,     // 탈퇴요청
      meta_value: {
         registered_number: "418-86-95742",
         address: {
            post_code: "54869",
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한친구들"
         },
         level: 5,
         owner_name: "김선호2",
         business_type: value.businessType.ESTATE_AGENT,
         intro_comment: "환영합니다 ^^"
      }
   },
   {
      ID: 10,
      email: "cozyhouzz@cozyhouzz.co.kr",       // 사업주회원
      password: "$2a$05$Ak0Z3z7ntwuAAGwr75XoiO2aYO.d1CRbkT37tOYamWXtflgk4TPO6",   // 11112222
      member_type: "ADMIN",
      registered_date: "2017-01-13",
      telephone: "010-3800-2109",
      display_name: "운영자입니당",
      locale: "ko_KR",
      profile_image_path: "users/profile1_20170125150101.jpg",
      updated_date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      user_status: 1,
      meta_value: {
         registered_number: "999-99-99999",
         address: {
            post_code: "54869",
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 모빌리티랩"
         },
         level: 999
      }
   }
]

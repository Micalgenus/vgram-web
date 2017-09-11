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
      member_type: "PUBLIC",
      telephone: "010-3800-2109",
      createdAt: "2017-01-13",
      nickname: "김창민",
      locale: "ko-kr",
      profile_image_path: "users/kcmin08@naver.com/profile1_20170125150101.jpg",
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      auth0_user_id: "auth0|594d2a83391b872e301373d6",
      user_status: 1,
      meta_value: {
         point: 1,
         "phone_number": "010-3800-2109",
         "sns": {
            "website": "",
            "facebook": "",
            "instagram": "",
            "twitter": ""
         }
      }
   },
   {
      ID: 2,
      email: "pastelbook89@gmail.com",    // 일반 회원
      member_type: "PUBLIC",
      telephone: "010-8501-7641",
      createdAt: "2017-01-13",
      nickname: "모빌리티랩",
      locale: "ko-kr",
      profile_image_path: "users/pastelbook89@gmail.com/profile2_20170125150101.jpg",
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      auth0_user_id: "auth0|594d6e3142ecdd2bf469a86b",
      user_status: 1,
      meta_value: {
         point: 2,
         "phone_number": "+82-010-3800-2109",
         "sns": {
            "website": "",
            "facebook": "",
            "instagram": "",
            "twitter": ""
         }
      }
   },
   {
      ID: 3,
      email: "3333@gmail.com",    // 일반 회원
      member_type: "PUBLIC",
      createdAt: "2017-01-13",
      telephone: "010-7676-7745",
      nickname: "조영현",
      locale: "ko-kr",
      profile_image_path: "users/3333@gmail.com/profile3_20170125150101.jpg",
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      auth0_user_id: "auth0|594d739742ecdd2bf469aa9b",
      user_status: 1,
      meta_value: {
         point: 3,
         "phone_number": "010-3800-2109",
         "sns": {
            "website": "",
            "facebook": "",
            "instagram": "",
            "twitter": ""
         }
      }
   },
   {
      ID: 4,
      email: "4444@gmail.com",    // 일반 회원
      member_type: "PUBLIC",
      createdAt: "2017-01-13",
      telephone: "010-3374-7524",
      nickname: "이정현",
      locale: "ko-kr",
      profile_image_path: "users/4444@gmail.com/CEa3o9aj1JlzpgVzWV2zxsZGxRoYjp4m.png",
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      auth0_user_id: "auth0|594d793442ecdd2bf469ac8d",
      user_status: 1,
      meta_value: {
         point: 4,
         "phone_number": "010-3800-2109",
         "sns": {
            "website": "",
            "facebook": "",
            "instagram": "",
            "twitter": ""
         }
      }
   },
   {
      ID: 5,
      email: "sinho0689@gmail.com",       // 사업주회원
      member_type: "BUSINESS",
      createdAt: "2017-01-13",
      telephone: "010-3800-2109",
      nickname: "모랩",
      locale: "ko-kr",
      profile_image_path: "users/sinho0689@gmail.com/zrss85pYUt5u08Au0SxBy6TdTzTmbWQT.png",
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      auth0_user_id: "auth0|594d79d9391b872e301393cb",
      user_status: 1,
      meta_value: {
         registered_number: "418-08-80915",
         address: {
            post_code: "54869",
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한집"
         },
         point: 2,
         owner_name: "김선호",
         business_type: value.businessType.LANDLORD,
         comment: "환영합니다 ^^",
         "phone_number": "010-3800-2109",
         "sns": {
            "website": "",
            "facebook": "",
            "instagram": "",
            "twitter": ""
         }
      }
   },
   {
      ID: 6,
      email: "6666@gmail.com",       // 사업주회원
      member_type: "BUSINESS",
      createdAt: "2017-01-13",
      telephone: "010-3800-2109",
      nickname: "모랩123",
      locale: "ko-kr",
      profile_image_path: "users/6666@gmail.com/ggBWvTgLtYvorT1soBdnIaimV323v6mA.png",
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      auth0_user_id: "auth0|594d7b97391b872e30139499",
      user_status: 1,
      meta_value: {
         registered_number: "418-86-95742",
         address: {
            post_code: "54869",
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한친구들"
         },
         point: 2,
         owner_name: "김선호1",
         business_type: value.businessType.ESTATE_AGENT,
         comment: "환영합니다 ^^",
         "phone_number": "010-3800-2109",
         "sns": {
            "website": "",
            "facebook": "",
            "instagram": "",
            "twitter": ""
         }
      }
   },
   {
      ID: 7,
      email: "7777@gmail.com",       // 사업주회원
      member_type: "BUSINESS",
      createdAt: "2017-01-13",
      telephone: "010-3800-2109",
      nickname: "모빌모빌모빌",
      locale: "ko-kr",
      profile_image_path: "users/7777@gmail.com/2f6WCR8vRQ2E2vdXmGPcdTFwfm8SPBEO.png",
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      auth0_user_id: "auth0|594d7c77391b872e301394f0",
      user_status: 1,
      meta_value: {
         registered_number: "418-86-95742",
         address: {
            post_code: "54869",
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한친구들"
         },
         point: 3,
         owner_name: "김선호1",
         business_type: value.businessType.LANDLORD,
         comment: "환영합니다 ^^",
         "phone_number": "010-3800-2109",
         "sns": {
            "website": "",
            "facebook": "",
            "instagram": "",
            "twitter": ""
         }
      }
   },
   {
      ID: 8,
      email: "8888@gmail.com",       // 사업주회원
      member_type: "BUSINESS",
      createdAt: "2017-01-13",
      telephone: "010-3800-2109",
      nickname: "몽몽몽키키키킼",
      locale: "ko-kr",
      profile_image_path: "users/8888@gmail.com/QbIdOx07WBXKKGrHQ44v8poy6H6Ab3xY.png",
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      auth0_user_id: "auth0|594d7d78391b872e3013955c",
      user_status: 0,      // 휴면계정
      meta_value: {
         registered_number: "418-86-95742",
         address: {
            post_code: "54869",
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한친구들"
         },
         point: 4,
         owner_name: "김선호1",
         business_type: value.businessType.ESTATE_AGENT,
         comment: "환영합니다 ^^",
         "phone_number": "010-3800-2109",
         "sns": {
            "website": "",
            "facebook": "",
            "instagram": "",
            "twitter": ""
         }
      }
   },
   {
      ID: 9,
      email: "9999@gmail.com",       // 사업주회원
      member_type: "BUSINESS",
      createdAt: "2017-01-13",
      telephone: "010-3800-2109",
      nickname: "몽키1",
      locale: "ko-kr",
      profile_image_path: "users/9999@gmail.com/UdnUUv6DIgWjPOSAHKGhN7GR5aF5OpoD.png",
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      auth0_user_id: "auth0|594d7e00cf1a4c2c243726aa",
      user_status: -1,     // 탈퇴요청
      meta_value: {
         registered_number: "418-86-95742",
         address: {
            post_code: "54869",
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한친구들"
         },
         point: 5,
         owner_name: "김선호2",
         business_type: value.businessType.ESTATE_AGENT,
         comment: "환영합니다 ^^",
         "phone_number": "010-3800-2109",
         "sns": {
            "website": "",
            "facebook": "",
            "instagram": "",
            "twitter": ""
         }
      }
   },
   {
      ID: 10,
      email: "cozyhouzz@cozyhouzz.co.kr",       // 사업주회원
      member_type: "ADMIN",
      createdAt: "2017-01-13",
      telephone: "010-3800-2109",
      nickname: "운영자입니당",
      locale: "ko-kr",
      profile_image_path: "users/cozyhouzz@cozyhouzz.co.kr/V2di8bkpGziOKtQ2bgfv1l7hDjF3VSPc.jpeg",
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      auth0_user_id: "auth0|594d7e8d391b872e301395cd",
      user_status: 1,
      meta_value: {
         registered_number: "999-99-99999",
         address: {
            post_code: "54869",
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 모빌리티랩"
         },
         point: 999,
         "phone_number": "010-3800-2109",
         "sns": {
            "website": "",
            "facebook": "",
            "instagram": "",
            "twitter": ""
         }
      }
   }
]

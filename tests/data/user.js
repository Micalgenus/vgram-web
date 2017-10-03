'use strict';
/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var path = require('path');
var moment = require('moment');
var _ = require("lodash");

moment.locale("ko");
var scriptName = path.basename(__filename);
var requestSync = require('sync-request');

var value = require("../../utils/staticValue");
var config = require('../../config/main');

const log = require('console-log-level')({
  prefix: function () {
    return new Date().toISOString() + ", " + scriptName;
  },
  level: 'debug'
});

//------------------------------------------
// user table
//------------------------------------------
let data = [  // 데이터 작성 샘플, 실제 데이터는 auth0을 통하여 삽입됨
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
      user_name: "김선호",
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
      user_name: "김선호1",
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
      user_name: "김선호1",
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
      user_name: "김선호1",
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
      user_name: "김선호2",
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
];

let getAllUserInfoByAuth0 = function () {
  let options = {
    method: 'POST',
    url: config.auth0.ISSUER + 'oauth/token',
    headers: {'content-type': 'application/json'},
    body: {
      grant_type: 'client_credentials',
      client_id: config.auth0.CLIENT_ID,
      client_secret: config.auth0.CLIENT_SECRET,
      audience: config.auth0.IDENTIFIER
    },
    json: true
  };

// get access key
  let getTokenRes = requestSync(options.method, options.url, {
    headers: {'content-type': 'application/json'},
    json: {
      grant_type: 'client_credentials',
      client_id: config.auth0.CLIENT_ID,
      client_secret: config.auth0.CLIENT_SECRET,
      audience: config.auth0.IDENTIFIER
    },
    timeout: 5000
  });

  let getTokenResBody = getTokenRes.getBody('utf8');

  if (getTokenResBody) {
    let data = JSON.parse(getTokenResBody);

    let args = {
      method: 'GET',
      url: config.auth0.IDENTIFIER + 'users',
      // qs: {
      //   'per_page': 50,
      //   'page': idx
      // },

      headers: {
        'Authorization': 'Bearer ' + data.access_token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    let getAllUsersRes = requestSync(args.method, args.url, {
      headers: args.headers,
      timeout: 5000
    });

    let getAllUsersResBody = getAllUsersRes.getBody('utf8');

    if (getAllUsersResBody != '[]') {
      let datas = JSON.parse(getAllUsersResBody);

      let users = _.map(datas, function (data) {
        let u = {
          ID: data.app_metadata.ID,
          email: data.email,
          // password: 'PASSWORD',
          member_type: data.app_metadata.roles[0],
          nickname: data.user_metadata.nickname,
          user_status: data.app_metadata.user_status,
          telephone: data.user_metadata.telephone,
          createdAt: data.created_at,
          auth0_user_id: data.user_id,
          locale: data.user_metadata.locale,
          profile_image_path: data.user_metadata.profile_image_path,
          updatedAt: data.app_metadata.updated_at,
          meta_value: {
            registered_number: data.user_metadata.registered_number,
            address: {
              post_code: data.user_metadata.address.post_code,
              addr1: data.user_metadata.address.addr1,
              addr2: data.user_metadata.address.addr2,
            },
            point: data.app_metadata.point,
            // user_name: "김선호",
            // business_type: "LANDLORD",
            // comment: "환영합니다 ^^",
            phone_number: data.user_metadata.phone_number,
          }
        };

        return u;
      });

      return users;
    } else if (getAllUsersResBody == '[]'){
      return [];
    } else {
      throw new Error("getAllUserInfoByAuth0 error");
    }
  }
}

try {
  module.exports = getAllUserInfoByAuth0();
} catch (err) {
  log.error(err.name, err.message);
}


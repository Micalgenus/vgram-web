/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");

var value = require("../utils/staticValue");

module.exports = {
   //------------------------------------------
   // users table
   //------------------------------------------
   users: [
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
            level: 1,
            like: [1,2,23,4]
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
   ],

   //------------------------------------------
   // user_post_relationships table
   //------------------------------------------
   user_post_relationships: [
      {
         user_id: 1,
         post_id: 1
      },
      {
         user_id: 2,
         post_id: 1
      },
      {
         user_id: 3,
         post_id: 1
      },
      {
         user_id: 4,
         post_id: 1
      },
      {
         user_id: 5,
         post_id: 1
      },
      {
         user_id: 6,
         post_id: 1
      },
      {
         user_id: 7,
         post_id: 1
      },
      {
         user_id: 8,
         post_id: 1
      },
      {
         user_id: 9,
         post_id: 1
      },
      {
         user_id: 10,
         post_id: 1
      },
      {
         user_id: 1,
         post_id: 2
      },
      {
         user_id: 1,
         post_id: 3
      }
   ],


   //------------------------------------------
   // user_post_like_relationships table
   //------------------------------------------
   user_post_like_relationships: [
      {
         user_id: 1,
         post_id: 1
      },
      {
         user_id: 2,
         post_id: 1
      },
      {
         user_id: 3,
         post_id: 1
      },
      {
         user_id: 4,
         post_id: 1
      },
      {
         user_id: 5,
         post_id: 1
      },
      {
         user_id: 6,
         post_id: 1
      },
      {
         user_id: 7,
         post_id: 1
      },
      {
         user_id: 8,
         post_id: 1
      },
      {
         user_id: 9,
         post_id: 1
      },
      {
         user_id: 10,
         post_id: 1
      },
      {
         user_id: 1,
         post_id: 2
      },
      {
         user_id: 1,
         post_id: 3
      }
   ],


   //------------------------------------------
   // user_user_relationships table
   //------------------------------------------
   user_user_relationships: [
      {
         user_id: 1,
         user_target_id: 2
      },
      {
         user_id: 1,
         user_target_id: 3
      },
      {
         user_id: 1,
         user_target_id: 4
      },
      {
         user_id: 2,
         user_target_id: 1
      },
      {
         user_id: 2,
         user_target_id: 3
      },
      {
         user_id: 3,
         user_target_id: 4
      },
      {
         user_id: 4,
         user_target_id: 5
      },
      {
         user_id: 4,
         user_target_id: 6
      },
      {
         user_id: 4,
         user_target_id: 7
      },
      {
         user_id: 5,
         user_target_id: 7
      },
      {
         user_id: 6,
         user_target_id: 1
      },
      {
         user_id: 7,
         user_target_id: 2
      }
   ],

   //------------------------------------------
   // users_metas table
   //------------------------------------------
   user_metas: [
      {
         ID: 1,
         user_id: 5,    // 일반 회원
         meta_key: "metas",
         meta_value: JSON.stringify({
            attached: [1, 2, 3]     // attached 기본 ID
         })
      }
   ],

   //------------------------------------------
   // posts table
   //------------------------------------------
   posts: [
      {
         id: 1,
         user_id: 1,
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 1번 유저</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p><img style="width: 411px;" src="./medias/images/360x240_201606281846.jpg" data-media-id="1" />',
         title: '1번 user 게시물입니다',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'room',
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            written_device: "web",
            secret_note: "비밀메모글0"
         }
      },
      {
         id: 2,
         user_id: 2,
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 2번 유저</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p><img style="width: 411px;" src="./medias/images/1975-20150311114607.jpg" data-media-id="2" />',
         title: '2번 user 게시물입니다',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'room',
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            written_device: "web",
            secret_note: "비밀메모글1"
         }
      },
      {
         id: 3,
         user_id: 3,
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 3번 유저</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p><img style="width: 411px;" src="./medias/images/건축분쟁_201701254601136.jpg" data-media-id="3" />',
         title: '3번 user 게시물입니다',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'room',
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            written_device: "web",
            secret_note: "비밀메모글2"
         }
      },
      {
         id: 4,
         user_id: 4,
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 4번 유저</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
         title: '4번 user 게시물입니다',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'room',
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            written_device: "web",
            secret_note: "비밀메모글3"
         }
      },
      {
         id: 5,
         user_id: 5,
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 5번 유저</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
         title: '5번 user 게시물입니다',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'room',
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            written_device: "mobile",      // 모바일 환경에서 작성함
            secret_note: "비밀메모글4"
         }
      },
      {
         id: 6,
         user_id: 6,
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 6번 유저</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
         title: '6번 user 게시물입니다',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'room',
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            written_device: "mobile",      // 모바일 환경에서 작성함
            secret_note: "비밀메모글5"
         }
      },
      {
         id: 7,
         user_id: 7,
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 7번 유저</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
         title: '7번 user 게시물입니다',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'room',
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            written_device: "web",
            secret_note: "비밀메모글7"
         }
      },
      {
         id: 8,
         user_id: 8,
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 8번 유저</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
         title: '8번 user 게시물입니다',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'room',
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            written_device: "web",
            secret_note: "비밀메모글9"
         }
      },
      {
         id: 9,
         user_id: 9,
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 9번 유저</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
         title: '9번 user 게시물입니다',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'room',
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            written_device: "web",
            secret_note: "비밀메모글9"
         }
      },
      {
         id: 10,
         user_id: 10,
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 10번 유저</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
         title: '10번 user 게시물입니다',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'room',
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            written_device: "web"
         }
      },
      {
         id: 11,
         user_id: 10,      // 관리자 작성
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 공지사항1</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
         title: '공지사항 1입니다',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'notice',     // 공지사항
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            written_device: "web"
         }
      },
      {
         id: 12,
         user_id: 10,      // 관리자 작성
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 공지사항2</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
         title: '공지사항2',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'notice',     // 공지사항
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            written_device: "web"
         }
      },
      {
         id: 13,
         user_id: 10,      // 관리자 작성
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 이벤트2</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
         title: '이벤트1',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'event',     // 공지사항
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            thumbnail_image_path: "medias/vtours/1474243481136/vtour/panos/SAM_100_0008.tiles/thumb.jpg",
            thumbnail_media_id: 9,     // thumbnail과 연결된 media.ID
            written_device: "web"
         }
      },
      {
         id: 14,
         user_id: 10,      // 관리자 작성
         post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
         post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         content: '<p style="text-align: center; ">Hi, HTML Text 이벤트2</p><p style="text-align: center; ">' +
         'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
         title: '이벤트2',
         post_status: 'publish',
         post_modified_date: '2017-01-25 00:00:00',
         post_modified_date_gmt: '2017-01-25 03:00:00',
         post_type: 'event',     // 공지사항
         read_count: 0,
         like: 0,
         unlike: 0,
         locale: 'ko_KR',
         meta_value: {
            thumbnail_image_path: "medias/vtours/1474243481136/vtour/panos/SAM_100_0008.tiles/thumb.jpg",
            thumbnail_media_id: 9,     // thumbnail과 연결된 media.ID
            written_device: "web"
         }
      }
   ],

   //------------------------------------------
   // post_metas table
   //------------------------------------------
   post_metas: [

   ],

   //------------------------------------------
   // rooms table
   //------------------------------------------
   rooms: [
      {
         ID: 1,
         post_id: 1,
         room_type: "ONE_ROOM",
         post_code: "54922",
         address: {
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한집"
         },
         old_address: {
            addr1: "전라북도 전주시 덕진구 금암동 1587-31",
            addr2: "전북대학교 구주소입니당"
         },
         old_address_dong: "금암동",
         coordinate: {
            lat: 35.8598743,
            lng: 127.1117673
         },
         thumbnail_image_path: "medias/vtours/1474243481136/vtour/panos/SAM_100_0008.tiles/thumb.jpg",
         thumbnail_media_id: 9,     // thumbnail과 연결된 media.ID
         deposit: 100,     // 만원
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
         address: {
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한집"
         },
         old_address: {
            addr1: "전라북도 전주시 덕진구 금암동 1587-31",
            addr2: "전북대학교 구주소입니당"
         },
         old_address_dong: "금암동",
         coordinate: {
            lat: 35.8598743,
            lng: 127.1117673
         },
         thumbnail_image_path: "medias/vtours/1474866921708/vtour/panos/SAM_100_0073.tiles/thumb.jpg",
         thumbnail_media_id: 10,     // thumbnail과 연결된 media.ID
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
         address: {
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한집"
         },
         old_address: {
            addr1: "전라북도 전주시 덕진구 금암동 1587-31",
            addr2: "전북대학교 구주소입니당"
         },
         old_address_dong: "금암동",
         coordinate: {
            lat: 35.8598743,
            lng: 127.1117673
         },
         thumbnail_image_path: "medias/vtours/1474243481136/vtour/panos/SAM_100_0008.tiles/thumb.jpg",
         thumbnail_media_id: 9,     // thumbnail과 연결된 media.ID
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
         address: {
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한집"
         },
         old_address: {
            addr1: "전라북도 전주시 덕진구 금암동 1587-31",
            addr2: "전북대학교 구주소입니당"
         },
         old_address_dong: "금암동",
         coordinate: {
            lat: 35.8598743,
            lng: 127.1117673
         },
         thumbnail_image_path: "medias/vtours/1474866921708/vtour/panos/SAM_100_0073.tiles/thumb.jpg",
         thumbnail_media_id: 10,     // thumbnail과 연결된 media.ID
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
         address: {
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한집"
         },
         old_address: {
            addr1: "전라북도 전주시 덕진구 금암동 1587-31",
            addr2: "전북대학교 구주소입니당"
         },
         old_address_dong: "금암동",
         coordinate: {
            lat: 35.8598743,
            lng: 127.1117673
         },
         thumbnail_image_path: "medias/vtours/1474243481136/vtour/panos/SAM_100_0008.tiles/thumb.jpg",
         thumbnail_media_id: 9,     // thumbnail과 연결된 media.ID
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
         address: {
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한집"
         },
         old_address: {
            addr1: "전라북도 전주시 덕진구 금암동 1587-31",
            addr2: "전북대학교 구주소입니당"
         },
         old_address_dong: "금암동",
         coordinate: {
            lat: 35.8598743,
            lng: 127.1117673
         },
         thumbnail_image_path: "medias/vtours/1474866921708/vtour/panos/SAM_100_0073.tiles/thumb.jpg",
         thumbnail_media_id: 10,     // thumbnail과 연결된 media.ID
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
         address: {
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한집"
         },
         old_address: {
            addr1: "전라북도 전주시 덕진구 금암동 1587-31",
            addr2: "전북대학교 구주소입니당"
         },
         old_address_dong: "금암동",
         coordinate: {
            lat: 35.8598743,
            lng: 127.1117673
         },
         thumbnail_image_path: "medias/vtours/1474243481136/vtour/panos/SAM_100_0008.tiles/thumb.jpg",
         thumbnail_media_id: 9,     // thumbnail과 연결된 media.ID
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
         address: {
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한집"
         },
         old_address: {
            addr1: "전라북도 전주시 덕진구 금암동 1587-31",
            addr2: "전북대학교 구주소입니당"
         },
         old_address_dong: "금암동",
         coordinate: {
            lat: 35.8598743,
            lng: 127.1117673
         },
         thumbnail_image_path: "medias/vtours/1474866921708/vtour/panos/SAM_100_0074.tiles/thumb.jpg",
         thumbnail_media_id: 10,     // thumbnail과 연결된 media.ID
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
         address: {
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한집"
         },
         old_address: {
            addr1: "전라북도 전주시 덕진구 금암동 1587-31",
            addr2: "전북대학교 구주소입니당"
         },
         old_address_dong: "금암동",
         coordinate: {
            lat: 35.8598743,
            lng: 127.1117673
         },
         thumbnail_image_path: "medias/vtours/1474243481136/vtour/panos/SAM_100_0008.tiles/thumb.jpg",
         thumbnail_media_id: 9,     // thumbnail과 연결된 media.ID
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
         address: {
            addr1: "전북 전주시 덕진구 백제대로 567",
            addr2: "전북대학교 창업동아리 아늑한집"
         },
         old_address: {
            addr1: "전라북도 전주시 덕진구 금암동 1587-31",
            addr2: "전북대학교 구주소입니당"
         },
         old_address_dong: "금암동",
         coordinate: {
            lat: 35.8598743,
            lng: 127.1117673
         },
         thumbnail_image_path: "medias/vtours/1474866921708/vtour/panos/SAM_100_0075.tiles/thumb.jpg",    // fullpath(file_path + tiles[x].dir + thumbnail)
         thumbnail_media_id: 10,     // thumbnail과 연결된 media.ID
         deposit: 100,     // 만원
         monthly_rent_fee: 25,      // 만원
         area_size: 10,    // 평
         meta_value: {
            options: ["심야전기"]
         }
      }
   ],


   //------------------------------------------
   // attached table
   //------------------------------------------
   attached: [
      {
         ID: 1,
         group: "5852a2215fa82",
         type: "zip",
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "attached",
         file_name: "addrlinkSample_2017012612.zip",
         meta_value: {}
      },
      {
         ID: 2,
         group: "5852a2215fa82",
         type: "wma",
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "attached",
         file_name: "jeonju_song_201701261354.wma",
         meta_value: {}
      },
      {
         ID: 3,
         group: "5852a22123667aas",
         type: "png",
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "attached",
         file_name: "wordpress-dberdiagram.png",
         meta_value: {}
      },
      {
         ID: 4,
         group: "5852a22123667aas",
         type: "pdf",
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "attached",
         file_name: "연수과정안내_2017012316.pdf",
         meta_value: {}
      }
   ],

   //------------------------------------------
   // post_attached_relationships table
   //------------------------------------------
   post_attached_relationships: [
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
   ],

   //------------------------------------------
   // medias table
   //------------------------------------------
   medias: [
      {
         ID: 1,
         media_group: "4s9df41a3z97dt",
         media_type: "jpg",   // 일단 확장자명으로 구분하자
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "medias/images",
         file_name: "360x240_201606281846.jpg",    // 원본 이미지 경로
         meta_value: {     // thumb,
            // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
            // thumb: "360x240_201606281846_thumb.jpg"
         }
      },
      {
         ID: 2,
         media_group: "4s9df41a3z97dt",
         media_type: "jpg",
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "medias/images",
         file_name: "1975-20150311114607.jpg",    // 원본 이미지 경로
         meta_value: {     // thumb,
            // thumb: "360x240_201606281846_thumb.jpg"
         }
      },
      {
         ID: 3,
         media_group: "4s9df41a3z97dt",
         media_type: "jpg",
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "medias/images",
         file_name: "건축분쟁_201701254601136.jpg",    // 원본 이미지 경로
         meta_value: {     // thumb,
            // thumb: "360x240_201606281846_thumb.jpg"
         }
      },
      {
         ID: 4,
         media_group: "4s9df41a3z97dt",
         media_type: "vr_image",    // vr이미지(변환전)
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "medias/vrimages",
         file_name: "SAM_100_0008.jpg",    // 원본 이미지가 저장된다
         meta_value: {     // thumb,
            // thumb: "360x240_201606281846_thumb.jpg"
         }
      },
      {
         ID: 5,
         media_group: "4s9df41a3z97dt",
         media_type: "vr_image",
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "medias/vrimages",
         file_name: "SAM_100_0009.jpg",    // 원본 이미지가 저장된다
         meta_value: {     // thumb,
            // thumb: "360x240_201606281846_thumb.jpg"
         }
      },
      {
         ID: 6,
         media_group: "4s9df41a3z97dt",
         media_type: "vr_image",
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "medias/vrimages",
         file_name: "SAM_100_0073.jpg",    // 원본 이미지가 저장된다
         meta_value: {     // thumb,
            // thumb: "360x240_201606281846_thumb.jpg"
         }
      },
      {
         ID: 7,
         media_group: "4s9df41a3zsscf7dt",
         media_type: "vr_image",
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "medias/vrimages",
         file_name: "SAM_100_0074.jpg",    // 원본 이미지가 저장된다
         meta_value: {     // thumb,
            // thumb: "360x240_201606281846_thumb.jpg"
         }
      },
      {
         ID: 8,
         media_group: "4s9df41a3zsscf7dt",
         media_type: "vr_image",
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "medias/vrimages",
         file_name: "SAM_100_0075.jpg",    // 원본 이미지가 저장된다
         meta_value: {     // thumb,
            // thumb: "360x240_201606281846_thumb.jpg"
         }
      },
      {
         ID: 9,
         media_group: "4s9df41a3zsscf7dt",
         media_type: "vtour",
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "medias/vtours/1474243481136",
         file_name: "tour.html",    // 원본 이미지가 저장된다
         meta_value: {     // thumb,
            jsName: "tour.js",      // html과 같은 폴더내 있음
            originalImage: [4, 5],     // medias.ID
            statusCode: 1,        // 변환 완료여부
            swfName: "tour.js",      // html과 같은 폴더내 있음
            tiles: [{
               dir: "vtour/panos/SAM_100_0008.tiles",
               thumbnail: "thumb.jpg"
            }, {
               dir: "vtour/panos/SAM_100_0009.tiles",
               thumbnail: "thumb.jpg"
            }],
            xmlName: "tour.xml",      // html과 같은 폴더내 있음
         }
      },
      {
         ID: 10,
         media_group: "4s9df41a3zsscf7dt",
         media_type: "vtour",
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "medias/vtours/1474866921708",
         file_name: "tour.html",    // 원본 이미지가 저장된다
         meta_value: {     // thumb,
            jsName: "tour.js",      // html과 같은 폴더내 있음
            originalImage: [6, 7, 8],     // medias.ID
            statusCode: 1,    // 변환 완료여부
            swfName: "tour.js",      // html과 같은 폴더내 있음
            tiles: [{
               dir: "vtour/panos/SAM_100_0073.tiles",
               thumbnail: "thumb.jpg"
            }, {
               dir: "vtour/panos/SAM_100_0074.tiles",
               thumbnail: "thumb.jpg"
            }, {
               dir: "vtour/panos/SAM_100_0075.tiles",
               thumbnail: "thumb.jpg"
            }],
            xmlName: "tour.xml",      // html과 같은 폴더내 있음
         }
      }
   ],

   //------------------------------------------
   // post_media_relationships table
   //------------------------------------------
   post_media_relationships: [
      {
         post_id: 1,
         media_id: 9
      },
      {
         post_id: 2,
         media_id: 10
      },
      {
         post_id: 3,
         media_id: 9
      },
      {
         post_id: 4,
         media_id: 10
      },
      {
         post_id: 5,
         media_id: 9
      },
      {
         post_id: 6,
         media_id: 10
      },
      {
         post_id: 7,
         media_id: 9
      },
      {
         post_id: 8,
         media_id: 10
      },
      {
         post_id: 9,
         media_id: 9
      },
      {
         post_id: 10,
         media_id: 10
      },
      {
         post_id: 1,
         media_id: 1
      },
      {
         post_id: 2,
         media_id: 2
      },
      {
         post_id: 3,
         media_id: 3
      }
   ],

   //------------------------------------------
   // hash_table table
   //------------------------------------------
   hash_table: [
      {
         key: "5852a2215fa82",
         value: "문서모음"
      },
      {
         key: "5852a22123667aas",
         value: "2017년"
      },
      {
         key: "5852a221DEZ21as",
         value: "군산대모음"
      },
      {
         key: "5852a2QQYAH3667a",
         value: "익산시모음"
      },
      {
         key: "4s9df41a3z97dt",
         value: "일반미디어"
      },
      {
         key: "4s9df41a3zsscf7dt",
         value: "고급미디어"
      }
   ]
}

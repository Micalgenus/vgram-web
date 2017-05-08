/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");

//------------------------------------------
// post table
//------------------------------------------
module.exports = [
   {
      ID: 1,
      user_id: 1,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">Hi, HTML Text 1번 유저</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p><img style="width: 411px;" src="./medias/images/360x240_201606281846.jpg" data-media-ID="1" />',
      title: '1번 user 게시물입니다',
      post_status: 'publish',
      post_modified_date: '2017-01-25 00:00:00',
      post_modified_date_gmt: '2017-01-25 03:00:00',
      post_type: 'room',
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web",
         secret_note: "비밀메모글0"
      }
   },
   {
      ID: 2,
      user_id: 2,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">Hi, HTML Text 2번 유저</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p><img style="width: 411px;" src="./medias/images/1975-20150311114607.jpg" data-media-ID="2" />',
      title: '2번 user 게시물입니다',
      post_status: 'publish',
      post_modified_date: '2017-01-25 00:00:00',
      post_modified_date_gmt: '2017-01-25 03:00:00',
      post_type: 'room',
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web",
         secret_note: "비밀메모글1"
      }
   },
   {
      ID: 3,
      user_id: 3,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">Hi, HTML Text 3번 유저</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p><img style="width: 411px;" src="./medias/images/건축분쟁_201701254601136.jpg" data-media-ID="3" />',
      title: '3번 user 게시물입니다',
      post_status: 'publish',
      post_modified_date: '2017-01-25 00:00:00',
      post_modified_date_gmt: '2017-01-25 03:00:00',
      post_type: 'room',
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web",
         secret_note: "비밀메모글2"
      }
   },
   {
      ID: 4,
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
      locale: 'ko-kr',
      meta_value: {
         written_device: "web",
         secret_note: "비밀메모글3"
      }
   },
   {
      ID: 5,
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
      locale: 'ko-kr',
      meta_value: {
         written_device: "mobile",      // 모바일 환경에서 작성함
         secret_note: "비밀메모글4"
      }
   },
   {
      ID: 6,
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
      locale: 'ko-kr',
      meta_value: {
         written_device: "mobile",      // 모바일 환경에서 작성함
         secret_note: "비밀메모글5"
      }
   },
   {
      ID: 7,
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
      locale: 'ko-kr',
      meta_value: {
         written_device: "web",
         secret_note: "비밀메모글7"
      }
   },
   {
      ID: 8,
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
      locale: 'ko-kr',
      meta_value: {
         written_device: "web",
         secret_note: "비밀메모글9"
      }
   },
   {
      ID: 9,
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
      locale: 'ko-kr',
      meta_value: {
         written_device: "web",
         secret_note: "비밀메모글9"
      }
   },
   {
      ID: 10,
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
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 11,
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
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 12,
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
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 13,
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
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 14,
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
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   }
]

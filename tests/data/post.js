/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
var _ = require('lodash');

var addressData = require("./address");
var mediaData = require("./media");
moment.locale("ko");

//------------------------------------------
// post table
//------------------------------------------
var data = [
   {
      ID: 1,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">'+addressData[0].addr2+'</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p><img style="width: 411px;" src="./medias/images/360x240_201606281846.jpg" data-media-ID="1" />',
      title: addressData[0].addr1,
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      read_count: 0,
      thumbnail_image_path: [],      // 10번
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web",
         secret_note: "비밀메모글1",
         image_slider_order: [2, 4, 3]
      }
   },
   {
      ID: 2,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전라북도 전주시 덕진구 들사평3길 8-11</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p><img style="width: 411px;" src="./medias/images/1975-20150311114607.jpg" data-media-ID="2" />',
      title: '전라북도 전주시 덕진구 들사평3길 8-11',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      read_count: 0,
      thumbnail_image_path: [],      // 11번
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web",
         secret_note: "비밀메모글1",
      }
   },
   {
      ID: 3,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 완산구 서신천변로 50</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p><img style="width: 411px;" src="./medias/images/건축분쟁_201701254601136.jpg" data-media-ID="3" />',
      title: '전북 전주시 완산구 서신천변로 50',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 12번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web",
         secret_note: "비밀메모글2",
      }
   },
   {
      ID: 4,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 들사평2길 8</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '전북 전주시 덕진구 덕진동1가 1407-4',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      read_count: 0,
      thumbnail_image_path: [],      // 13번
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
      content: '<p style="text-align: center; ">전북 전주시 덕진구 들사평로 6</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '전라북도 전주시 덕진구 덕진동1가 1437-1',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
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
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전라북도 전주시 덕진구 하가3길 7-20</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '전라북도 전주시 덕진구 덕진동2가 135-2',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 10번
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
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 호반로 11</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '전라북도 전주시 덕진구 송천동1가 308-4',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 11번
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
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전라북도 전주시 덕진구 송천동1가 289-9</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '보디스사파이어 근처',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 12번
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
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전라북도 전주시 덕진구 송천로 31</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천서호1차아파트 5동 216호',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 13번
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
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 11,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 백제대로 563</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '코앞빌딩 5-208호 모빌리티랩',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 10번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web",
         secret_note: "비밀메모글9"
      }
   },
   {
      ID: 12,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 13,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 14,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 15,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 16,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 17,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 18,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 19,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 20,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 21,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 22,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 23,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 24,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 25,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 26,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 27,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 28,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 29,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 30,
      user_id: 5,
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">전북 전주시 덕진구 송천2길 18</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '송천비사벌아파트',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'ROOM',
      thumbnail_image_path: [],      // 14번
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 31,
      user_id: 10,      // 관리자 작성
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">Hi, HTML Text 공지사항1</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '공지사항 1입니다',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'NOTICE',     // 공지사항,
      thumbnail_image_path: [],
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 32,
      user_id: 10,      // 관리자 작성
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">Hi, HTML Text 공지사항2</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '공지사항2',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'NOTICE',     // 공지사항,
      thumbnail_image_path: [],
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 33,
      user_id: 10,      // 관리자 작성
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">Hi, HTML Text 이벤트2</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '이벤트1',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'EVENT',     // 공지사항
      thumbnail_image_path: [],
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   },
   {
      ID: 34,
      user_id: 10,      // 관리자 작성
      post_init_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      post_init_date_gmt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      content: '<p style="text-align: center; ">Hi, HTML Text 이벤트2</p><p style="text-align: center; ">' +
      'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>',
      title: '이벤트2',
      post_status: 'publish',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      post_type: 'EVENT',     // 공지사항
      thumbnail_image_path: [],
      read_count: 0,
      like: 0,
      locale: 'ko-kr',
      meta_value: {
         written_device: "web"
      }
   }
]

var testImages = ["./medias/images/360x240_201606281846.jpg", "./medias/images/1975-20150311114607.jpg",
   "./medias/images/건축분쟁_201701254601136.jpg"];

var testVRThumbnails = [];
// [
//    [{
//       ID: 10,
//       vrimages: [{      // 10번
//          ID: 7,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0073.tiles/thumb.jpg"
//       }, {
//          ID: 8,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0074.tiles/thumb.jpg"
//       }, {
//          ID: 9,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0075.tiles/thumb.jpg"
//       }]
//    }],
//    [{
//       ID: 11,
//       vrimages: [{      // 11번
//          ID: 6,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0009.tiles/thumb.jpg"
//       }, {
//          ID: 7,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0073.tiles/thumb.jpg"
//       }, {
//          ID: 8,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0074.tiles/thumb.jpg"
//       }]
//    }],
//    [{
//       ID: 12,
//       vrimages: [{      // 12번
//          ID: 7,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0073.tiles/thumb.jpg"
//       }, {
//          ID: 8,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0074.tiles/thumb.jpg"
//       }, {
//          ID: 9,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0075.tiles/thumb.jpg"
//       }]
//    }],
//    [{
//       ID: 13,
//       vrimages: [{      // 13번
//          ID: 5,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0008.tiles/thumb.jpg"
//       }, {
//          ID: 8,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0074.tiles/thumb.jpg"
//       }, {
//          ID: 9,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0075.tiles/thumb.jpg"
//       }]
//    }],
//    [{
//       ID: 14,
//       vrimages: [{      // 14번
//          ID: 5,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0008.tiles/thumb.jpg"
//       }, {
//          ID: 6,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0009.tiles/thumb.jpg"
//       }, {
//          ID: 7,
//          thumb: "medias/vrimages/sinho0689@gmail.com/SAM_100_0073.tiles/thumb.jpg"
//       }]
//    }]
// ];

var testThumbnails = [];
// [
//    {
//       ID: 13,
//       thumb: thumb.jpg
//    }, {
//       ID: 14,
//       thumb: thumb.jpg
//    }
// ]

for (i = 0; i < mediaData.length; i++) {     // testVRThumbnails 제작
   if (_.eq(mediaData[i].type, "VTOUR")) {
      var tmp = {};
      tmp.ID = mediaData[i].ID;
      tmp.vrimages = [];

      for (var id of mediaData[i].meta_value.original_media_id) {
         var originalObj = _.find(mediaData, { ID : id });
         var thumbPath = [
            originalObj.file_path,
            originalObj.meta_value.tile_dir_name,
            originalObj.meta_value.thumbnail_image_name].join("/");

         tmp.vrimages.push({
            ID: originalObj.ID,
            thumb: thumbPath
         });
      }

      testVRThumbnails.push([tmp]);
   }
}

for (i = 0; i < mediaData.length; i++) {     // testThumbnails 제작
   if (_.eq(mediaData[i].type, "NORMAL_IMAGE")) {
      var tmp = {};
      tmp.ID = mediaData[i].ID;
      tmp.thumb = [
         mediaData[i].file_path,
         mediaData[i].meta_value.mobile_dir,
         mediaData[i].file_name].join("/");

      testThumbnails.push(tmp);
   }
}

for (i = 0; i < 30; i++) {  // ROOM 관련 test 데이터 30개 생성
   data[i].content = '<p style="text-align: center; ">'+addressData[i].addr2+'</p><p style="text-align: center; ">' +
   'ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p><img style="width: 411px;" src="' + testImages[i%testImages.length] + '" data-media-ID="1" />';
   data[i].title = addressData[0].addr1;
   data[i].thumbnail_image_path = [];

   for (image of testVRThumbnails[i%testVRThumbnails.length]) {
      data[i].thumbnail_image_path.push(image);
   }
}

for (i = 30; i < data.length; i++) {
   data[i].thumbnail_image_path = testThumbnails;
}

for (i = 0; i < data.length; i++) {
   // post_media_relationship을 위해서 없으면 빈 배열이라도 넣어줘야됨
   data[i].meta_value.image_slider_order = [2, 3, 4];
}

module.exports = data;

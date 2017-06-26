/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");

//------------------------------------------
// media table
//------------------------------------------
module.exports = [
   {
      ID: 1,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "progressing.png",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/png',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 2,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "360x240_201606281846.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192346483,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 3,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "1975-20150311114607.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 193498741,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 4,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "건축분쟁_201701254601136.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192347135,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   //    VR 이미지에서 Mobile/Pc용 tile 변환까지 담당하는게 좋을 것 같다.
   {
      ID: 5,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "VR_IMAGE",    // vr이미지(변환전)
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vrimages/sinho0689@gmail.com",
      file_name: "SAM_100_0008.jpg",    // 원본 이미지가 저장된다
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 14588725,
         encoding: "7bit",
         tile_dir_name: "SAM_100_0008.tiles",
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
      }
   },
   {
      ID: 6,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "VR_IMAGE",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vrimages/sinho0689@gmail.com",
      file_name: "SAM_100_0009.jpg",    // 원본 이미지가 저장된다
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 14588725,
         encoding: "7bit",
         tile_dir_name: "SAM_100_0009.tiles",
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
      }
   },
   {
      ID: 7,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "VR_IMAGE",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vrimages/sinho0689@gmail.com",
      file_name: "SAM_100_0073.jpg",    // 원본 이미지가 저장된다
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 14588725,
         encoding: "7bit",
         tile_dir_name: "SAM_100_0073.tiles",
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
      }
   },
   {
      ID: 8,
      user_id: 5,
      group: "4s9df41a3zsscf7dt",
      type: "VR_IMAGE",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vrimages/sinho0689@gmail.com",
      file_name: "SAM_100_0074.jpg",    // 원본 이미지가 저장된다
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 14588725,
         encoding: "7bit",
         tile_dir_name: "SAM_100_0074.tiles",
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
      }
   },
   {
      ID: 9,
      user_id: 5,
      group: "4s9df41a3zsscf7dt",
      type: "VR_IMAGE",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vrimages/sinho0689@gmail.com",
      file_name: "SAM_100_0075.jpg",    // 원본 이미지가 저장된다
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 14588725,
         encoding: "7bit",
         tile_dir_name: "SAM_100_0074.tiles",
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
      }
   },
   //    vtour 변환시에는 vr image tile화는 하지말고 변환만 하자(tile화는 vrimage 저장시 자동으로 진행)
   {
      ID: 10,
      user_id: 5,
      group: "4s9df41a3zsscf7dt",
      type: "VTOUR",       // tour형으로 변환된 vr이미지
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vtours/sinho0689@gmail.com/201705310101",
      file_name: "tour.xml",    // xml 경로가 저장된다
      meta_value: {
         original_media_id: [7, 8, 9]
      }
   },
   {
      ID: 11,
      user_id: 5,
      group: "4s9df41a3zsscf7dt",
      type: "VTOUR",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vtours/sinho0689@gmail.com/201705310102",
      file_name: "tour.xml",    // xml 경로가 저장된다
      meta_value: {
         original_media_id: [6, 7, 8]     // medias.ID
      }
   },
   {
      ID: 12,
      user_id: 5,
      group: "4s9df41a3zsscf7dt",
      type: "VTOUR",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vtours/sinho0689@gmail.com/201705310103",
      file_name: "tour.xml",    // xml 경로가 저장된다
      meta_value: {
         original_media_id: [7, 8, 9]     // medias.ID
      }
   },
   {
      ID: 13,
      user_id: 5,
      group: "4s9df41a3zsscf7dt",
      type: "VTOUR",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vtours/sinho0689@gmail.com/201705310104",
      file_name: "tour.xml",    // xml 경로가 저장된다
      meta_value: {
         original_media_id: [5, 8, 9]     // medias.ID
      }
   },
   {
      ID: 14,
      user_id: 5,
      group: "4s9df41a3zsscf7dt",
      type: "VTOUR",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vtours/sinho0689@gmail.com/20170531010",
      file_name: "tour.xml",    // xml 경로가 저장된다
      meta_value: {
         original_media_id: [5, 6, 7, 9]     // medias.ID
      }
   }
]

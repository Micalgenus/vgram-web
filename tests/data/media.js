"use strict";

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
         real_file_name: "SAM_100_0008.jpg",
         // tile_dir_name: "SAM_100_0008.tiles",
         // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
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
         real_file_name: "SAM_100_0009.jpg",
         // tile_dir_name: "SAM_100_0009.tiles",
         // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
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
         real_file_name: "SAM_100_0073.jpg",
         // tile_dir_name: "SAM_100_0073.tiles",
         // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
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
         real_file_name: "SAM_100_0074.jpg",
         // tile_dir_name: "SAM_100_0074.tiles",
         // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
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
         real_file_name: "SAM_100_0075.jpg",    // 원본 이미지가 저장된다

         // tile_dir_name: "SAM_100_0075.tiles",
         // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
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
         tiles: [
            {
               ID: 7,  // media.ID
               dir_name: "SAM_100_0073.tiles"
            },
            {
               ID: 8,
               dir_name: "SAM_100_0074.tiles"
            },
            {
               ID: 9,
               dir_name: "SAM_100_0075.tiles"
            }
         ],
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
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
         tiles: [
            {
               ID: 6,  // media.ID
               dir_name: "SAM_100_0009.tiles"
            },
            {
               ID: 7,
               dir_name: "SAM_100_0073.tiles"
            },
            {
               ID: 8,
               dir_name: "SAM_100_0074.tiles"
            }
         ],
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
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
         tiles: [
            {
               ID: 7,  // media.ID
               dir_name: "SAM_100_0073.tiles"
            },
            {
               ID: 8,
               dir_name: "SAM_100_0074.tiles"
            },
            {
               ID: 9,
               dir_name: "SAM_100_0075.tiles"
            }
         ],
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
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
         tiles: [
            {
               ID: 5,  // media.ID
               dir_name: "SAM_100_0008.tiles"
            },
            {
               ID: 8,
               dir_name: "SAM_100_0074.tiles"
            },
            {
               ID: 9,
               dir_name: "SAM_100_0075.tiles"
            }
         ],
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
      }
   },
   {
      ID: 14,
      user_id: 5,
      group: "4s9df41a3zsscf7dt",
      type: "VTOUR",
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vtours/sinho0689@gmail.com/201705310105",
      file_name: "tour.xml",    // xml 경로가 저장된다
      meta_value: {
         tiles: [
            {
               ID: 5,  // media.ID
               dir_name: "SAM_100_0008.tiles"
            },
            {
               ID: 6,
               dir_name: "SAM_100_0009.tiles"
            },
            {
               ID: 7,
               dir_name: "SAM_100_0073.tiles"
            },
            {
               ID: 9,
               dir_name: "SAM_100_0075.tiles"
            }
         ],
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
      }
   },

    //2017.09.25 김석원 노멀 이미지 추가
    {
        ID: 15,
        user_id: 5,
        group: "4s9df41a3z97dt",
        type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
        createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        file_path: "medias/images/sinho0689@gmail.com",
        file_name: "sample1.jpg",    // 원본 이미지 경로
        meta_value: {     // thumb,
           mimetype: 'image/jpeg',
           size: 192342356,
           desktop_dir: "desktop",
           mobile_dir: "mobile",
           original_dir: "original"
           // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
           // thumb: "360x240_201606281846_thumb.jpg"
        }
     },
     {
      ID: 16,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample2.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 17,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample3.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 18,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample4.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 19,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample5.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 20,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample6.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 21,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample7.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 22,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample8.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 23,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample9.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 24,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample10.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 25,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample11.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 26,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample12.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 27,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample13.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 28,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample14.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 29,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample15.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 30,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "NORMAL_IMAGE",   // mimetype 형식으로 기록
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images/sinho0689@gmail.com",
      file_name: "sample16.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         mimetype: 'image/jpeg',
         size: 192342356,
         desktop_dir: "desktop",
         mobile_dir: "mobile",
         original_dir: "original"
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   //브이투어 타일 없음 ...ㅠㅠ
   {
    ID: 31,
    user_id: 5,
    group: "4s9df41a3zsscf7dt",
    type: "VR_IMAGE",
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    file_path: "medias/vrimages/sinho0689@gmail.com",
    file_name: "vr1.jpg",    // 원본 이미지가 저장된다
    meta_value: {     // thumb,
       mimetype: 'image/jpeg',
       size: 14588725,
       encoding: "7bit",
       real_file_name: "vr1.jpg",    // 원본 이미지가 저장된다

       // tile_dir_name: "SAM_100_0075.tiles",
       // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
       // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
       // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
    }
 },
 {
    ID: 32,
    user_id: 5,
    group: "4s9df41a3zsscf7dt",
    type: "VR_IMAGE",
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    file_path: "medias/vrimages/sinho0689@gmail.com",
    file_name: "vr2.jpg",    // 원본 이미지가 저장된다
    meta_value: {     // thumb,
       mimetype: 'image/jpeg',
       size: 14588725,
       encoding: "7bit",
       real_file_name: "vr2.jpg",    // 원본 이미지가 저장된다

       // tile_dir_name: "SAM_100_0075.tiles",
       // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
       // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
       // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
    }
 },
 {
    ID: 33,
    user_id: 5,
    group: "4s9df41a3zsscf7dt",
    type: "VR_IMAGE",
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    file_path: "medias/vrimages/sinho0689@gmail.com",
    file_name: "vr3.jpg",    // 원본 이미지가 저장된다
    meta_value: {     // thumb,
       mimetype: 'image/jpeg',
       size: 14588725,
       encoding: "7bit",
       real_file_name: "vr3.jpg",    // 원본 이미지가 저장된다

       // tile_dir_name: "SAM_100_0075.tiles",
       // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
       // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
       // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
    }
 },
 {
    ID: 34,
    user_id: 5,
    group: "4s9df41a3zsscf7dt",
    type: "VR_IMAGE",
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    file_path: "medias/vrimages/sinho0689@gmail.com",
    file_name: "vr4.jpg",    // 원본 이미지가 저장된다
    meta_value: {     // thumb,
       mimetype: 'image/jpeg',
       size: 14588725,
       encoding: "7bit",
       real_file_name: "vr4.jpg",    // 원본 이미지가 저장된다

       // tile_dir_name: "SAM_100_0075.tiles",
       // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
       // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
       // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
    }
 },
 {
    ID: 35,
    user_id: 5,
    group: "4s9df41a3zsscf7dt",
    type: "VR_IMAGE",
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    file_path: "medias/vrimages/sinho0689@gmail.com",
    file_name: "vr5.jpg",    // 원본 이미지가 저장된다
    meta_value: {     // thumb,
       mimetype: 'image/jpeg',
       size: 14588725,
       encoding: "7bit",
       real_file_name: "vr5.jpg",    // 원본 이미지가 저장된다

       // tile_dir_name: "SAM_100_0075.tiles",
       // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
       // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
       // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
    }
 },
 {
    ID: 36,
    user_id: 5,
    group: "4s9df41a3zsscf7dt",
    type: "VR_IMAGE",
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    file_path: "medias/vrimages/sinho0689@gmail.com",
    file_name: "vr6.jpg",    // 원본 이미지가 저장된다
    meta_value: {     // thumb,
       mimetype: 'image/jpeg',
       size: 14588725,
       encoding: "7bit",
       real_file_name: "vr6.jpg",    // 원본 이미지가 저장된다

       // tile_dir_name: "SAM_100_0075.tiles",
       // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
       // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
       // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
    }
 },
 {
    ID: 37,
    user_id: 5,
    group: "4s9df41a3zsscf7dt",
    type: "VR_IMAGE",
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    file_path: "medias/vrimages/sinho0689@gmail.com",
    file_name: "vr7.jpg",    // 원본 이미지가 저장된다
    meta_value: {     // thumb,
       mimetype: 'image/jpeg',
       size: 14588725,
       encoding: "7bit",
       real_file_name: "vr7.jpg",    // 원본 이미지가 저장된다

       // tile_dir_name: "SAM_100_0075.tiles",
       // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
       // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
       // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
    }
 },
 {
    ID: 9,
    user_id: 5,
    group: "4s9df41a3zsscf7dt",
    type: "VR_IMAGE",
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    file_path: "medias/vrimages/sinho0689@gmail.com",
    file_name: "vr8.jpg",    // 원본 이미지가 저장된다
    meta_value: {     // thumb,
       mimetype: 'image/jpeg',
       size: 14588725,
       encoding: "7bit",
       real_file_name: "vr8.jpg",    // 원본 이미지가 저장된다

       // tile_dir_name: "SAM_100_0075.tiles",
       // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
       // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
       // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
    }
 },
 {
    ID: 39,
    user_id: 5,
    group: "4s9df41a3zsscf7dt",
    type: "VR_IMAGE",
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    file_path: "medias/vrimages/sinho0689@gmail.com",
    file_name: "vr9.jpg",    // 원본 이미지가 저장된다
    meta_value: {     // thumb,
       mimetype: 'image/jpeg',
       size: 14588725,
       encoding: "7bit",
       real_file_name: "vr9.jpg",    // 원본 이미지가 저장된다

       // tile_dir_name: "SAM_100_0075.tiles",
       // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
       // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
       // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
    }
 },
 {
    ID: 40,
    user_id: 5,
    group: "4s9df41a3zsscf7dt",
    type: "VR_IMAGE",
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    file_path: "medias/vrimages/sinho0689@gmail.com",
    file_name: "vr10.jpg",    // 원본 이미지가 저장된다
    meta_value: {     // thumb,
       mimetype: 'image/jpeg',
       size: 14588725,
       encoding: "7bit",
       real_file_name: "vr10.jpg",    // 원본 이미지가 저장된다

       // tile_dir_name: "SAM_100_0075.tiles",
       // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
       // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
       // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
    }
 },
 {
    ID: 41,
    user_id: 5,
    group: "4s9df41a3zsscf7dt",
    type: "VR_IMAGE",
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    file_path: "medias/vrimages/sinho0689@gmail.com",
    file_name: "vr11.jpg",    // 원본 이미지가 저장된다
    meta_value: {     // thumb,
       mimetype: 'image/jpeg',
       size: 14588725,
       encoding: "7bit",
       real_file_name: "vr11.jpg",    // 원본 이미지가 저장된다

       // tile_dir_name: "SAM_100_0075.tiles",
       // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
       // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
       // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
    }
 },
 {
    ID: 42,
    user_id: 5,
    group: "4s9df41a3zsscf7dt",
    type: "VR_IMAGE",
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    file_path: "medias/vrimages/sinho0689@gmail.com",
    file_name: "vr12.jpg",    // 원본 이미지가 저장된다
    meta_value: {     // thumb,
       mimetype: 'image/jpeg',
       size: 14588725,
       encoding: "7bit",
       real_file_name: "vr12.jpg",    // 원본 이미지가 저장된다

       // tile_dir_name: "SAM_100_0075.tiles",
       // thumbnail_image_name: "thumb.jpg",// 단일면 이미지
       // preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
       // mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
    }
 },
  
   {
      ID: 43,
      user_id: 5,
      group: "4s9df41a3zsscf7dt",
      type: "VTOUR",       // tour형으로 변환된 vr이미지
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vtours/sinho0689@gmail.com/vtour",
      file_name: "tour.xml",    // xml 경로가 저장된다
      meta_value: {
         tiles: [
            {
               ID: 31,  // media.ID
               dir_name: "vr1.tiles"
            },
            {
               ID: 32,
               dir_name: "vr2.tiles"
            },
            {
               ID: 33,
               dir_name: "vr3.tiles"
            }
         ],
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
      }
   },
   {
      ID: 44,
      user_id: 5,
      group: "4s9df41a3zsscf7dt",
      type: "VTOUR",       // tour형으로 변환된 vr이미지
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vtours/sinho0689@gmail.com/vtour1",
      file_name: "tour.xml",    // xml 경로가 저장된다
      meta_value: {
         tiles: [
            {
               ID: 34,  // media.ID
               dir_name: "vr4.tiles"
            },
            {
               ID: 35,
               dir_name: "vr5.tiles"
            },
            {
               ID: 36,
               dir_name: "vr6.tiles"
            }
         ],
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
      }
   },
   {
      ID: 45,
      user_id: 5,
      group: "4s9df41a3zsscf7dt",
      type: "VTOUR",       // tour형으로 변환된 vr이미지
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vtours/sinho0689@gmail.com/vtour2",
      file_name: "tour.xml",    // xml 경로가 저장된다
      meta_value: {
         tiles: [
            {
               ID: 37,  // media.ID
               dir_name: "vr7.tiles"
            },
            {
               ID: 38,
               dir_name: "vr8.tiles"
            },
            {
               ID: 39,
               dir_name: "vr9.tiles"
            }
         ],
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
      }
   },
   {
      ID: 46,
      user_id: 5,
      group: "4s9df41a3zsscf7dt",
      type: "VTOUR",       // tour형으로 변환된 vr이미지
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vtours/sinho0689@gmail.com/vtour3",
      file_name: "tour.xml",    // xml 경로가 저장된다
      meta_value: {
         tiles: [
            {
               ID: 40,  // media.ID
               dir_name: "vr10.tiles"
            },
            {
               ID: 41,
               dir_name: "vr11.tiles"
            },
            {
               ID: 42,
               dir_name: "vr12.tiles"
            }
         ],
         thumbnail_image_name: "thumb.jpg",// 단일면 이미지
         preview_image_name: "preview.jpg",// 세로형 이미지(각 면->하나의 이미지)
         mobile_dir_name: "mobile"  // 모바일용 이미지 저장 폴더 이름
      }
   },
]

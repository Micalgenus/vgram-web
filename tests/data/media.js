/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");

//------------------------------------------
// media table
// VR
//------------------------------------------
module.exports = [
   {
      ID: 1,
      user_id: 10,
      group: "4s9df41a3z97dt",
      type: "image/png",   // mimetype 형식으로 기록
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images",
      file_name: "progressing.png",    // 원본 이미지 경로
      meta_value: {     // thumb,
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 2,
      user_id: 4,
      group: "4s9df41a3z97dt",
      type: "image/jpeg",   // mimetype 형식으로 기록
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images",
      file_name: "360x240_201606281846.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         // 일반 이미지는 이미지서버에서 thumb를 자동변환하여 전송할 예정임.
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 3,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "image/jpeg",
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images",
      file_name: "1975-20150311114607.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 4,
      user_id: 6,
      group: "4s9df41a3z97dt",
      type: "image/jpeg",
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/images",
      file_name: "건축분쟁_201701254601136.jpg",    // 원본 이미지 경로
      meta_value: {     // thumb,
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   //    VR 이미지에서 Mobile/Pc용 tile 변환까지 담당하는게 좋을 것 같다.
   {
      ID: 5,
      user_id: 4,
      group: "4s9df41a3z97dt",
      type: "image/vr",    // vr이미지(변환전)
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vrimages",
      file_name: "SAM_100_0008.jpg",    // 원본 이미지가 저장된다
      meta_value: {     // thumb,
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 6,
      user_id: 5,
      group: "4s9df41a3z97dt",
      type: "image/vr",
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vrimages",
      file_name: "SAM_100_0009.jpg",    // 원본 이미지가 저장된다
      meta_value: {     // thumb,
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 7,
      user_id: 6,
      group: "4s9df41a3z97dt",
      type: "image/vr",
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vrimages",
      file_name: "SAM_100_0073.jpg",    // 원본 이미지가 저장된다
      meta_value: {     // thumb,
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 8,
      user_id: 7,
      group: "4s9df41a3zsscf7dt",
      type: "image/vr",
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vrimages",
      file_name: "SAM_100_0074.jpg",    // 원본 이미지가 저장된다
      meta_value: {     // thumb,
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   {
      ID: 9,
      user_id: 4,
      group: "4s9df41a3zsscf7dt",
      type: "image/vr",
      date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      file_path: "medias/vrimages",
      file_name: "SAM_100_0075.jpg",    // 원본 이미지가 저장된다
      meta_value: {     // thumb,
         // thumb: "360x240_201606281846_thumb.jpg"
      }
   },
   //    vtour 변환시에는 vr image tile화는 하지말고 변환만 하자(tile화는 vrimage 저장시 자동으로 진행)
   {
      ID: 10,
      user_id: 4,
      group: "4s9df41a3zsscf7dt",
      type: "image/vtour",       // tour형으로 변환된 vr이미지
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
      ID: 11,
      user_id: 5,
      group: "4s9df41a3zsscf7dt",
      type: "image/vtour",
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
]

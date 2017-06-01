/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
var _ = require("lodash");
var postData = require('./post');
moment.locale("ko");

//------------------------------------------
// post_media_relationship table
//------------------------------------------
var data = [
   // {
   //    post_id: 1,
   //    media_id: 9
   // }
];

for (var post of postData) {
   // postData.thumbnail_image_path에 대한 데이터 삽입
   for (var image of post.thumbnail_image_path) {

      var tmp = {
         post_id: post.ID,
         media_id: image.ID
      };

      if (!_.find(data, tmp)) {
         data.push(tmp);
      }

      // vtour형식(vrimages[])가 있는 경우
      if (_.has(image, "vrimages")) {
         for (var vrimage of image.vrimages) {

            var tmp = {
               post_id: post.ID,
               media_id: vrimage.ID
            };

            if (!_.find(data, tmp)) {
               data.push(tmp);
            }
         }
      }
   }

   // postData.meta_value.image_slider_order에 대한 데이터 삽입
   for (var imageID of post.meta_value.image_slider_order) {
      var tmp = {
         post_id: post.ID,
         media_id: imageID
      };

      if (!_.find(data, tmp)) {
         data.push(tmp);
      }
   }
}

module.exports = data;

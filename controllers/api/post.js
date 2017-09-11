/**
 * Created by JHLee on 2017-01-25.
 */
"use strict";

const models = require('../../models');
const post = models.post;
const room = models.room;
const Media = models.media;
const Post_Media_relationship = models.post_media_relationship;
const _ = require('lodash');
const moment = require("moment");
const path = require("path");

const config = require("../../config/main");
var log = require('console-log-level')({
   prefix: function () {
      return new Date().toISOString()
   },
   level: config.logLevel
});

//공지사항 출력
exports.viewNotice = function (req, res) {
   let pageSize, pageStartIndex;

   // 페이지 정보 확인
   if (!req.query.pageSize || !req.query.pageStartIndex) {
      // query가 제대로 오지 않으면 초기값으로 보낸다.
      pageSize = 10;
      pageStartIndex = 0;
   } else {
      pageSize = _.toNumber(req.query.pageSize);
      pageStartIndex = _.toNumber(req.query.pageStartIndex);
   }
   //공지사항 조회
   return models.sequelize.query("select u.email, u.display_name, p.* " +
      "from users as u, post as p where u.ID = p.user_id and p.post_type = 'notice' limit ?,?",
      {replacements: [pageStartIndex, pageSize], type: models.sequelize.QueryTypes.SELECT}
   ).then(function (noticeList) {
      if (noticeList.length == 0) {
         return res.status(400).json({
            errorMsg: '정보 없음',
            statusCode: -1
         });
      } else {
         return res.status(200).json({
            noticeList: noticeList,
            statusCode: 1
         });
      }
   }).catch(function (err) {
      return res.status(400).json({
         errorMsg: 'DB select error',
         statusCode: -2
      });
   });
}

//2017-05-29 이정현 개발
// media, attached 파일정보 DB 저장
// media insert, post_media_relationship insert에 값 넣기
// return 은 상태코드만 날려주기
// url 접근 > api/post/normal-image
exports.createNormalImageInfo = function (req, res) {

   let token = req.headers['authorization'];
   //토큰 확인
   if (!token) {
      return res.status(400).json({
         errorMsg: 'Do not have a token',
         statusCode: -1
      });
   }

   let imageJSON;
   for (var key in req.body) {
      imageJSON = JSON.parse(key);
   }

   // let thumbnail_image_path = imageJSON.images[0].thumb;
   let medias = [];
   let m_relation = [];

   for (let i = 0; i < imageJSON.images.length; ++i) {

      let imageMetaValue = {
         mimetype: imageJSON.images[i].mimetype,
         size: imageJSON.images[i].size,
         desktop_dir: imageJSON.images[i].desktop_dir_name,
         mobile_dir: imageJSON.images[i].mobile_dir_name,
         original_dir: imageJSON.images[i].original_dir_name
      };

      medias.push({
         user_id: req.user.ID,
         type: imageJSON.images[i].type,
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "/medias/images/" + req.user.email,
         file_name: imageJSON.images[i].file_name,
         meta_value: imageMetaValue
      });
   }

   return models.sequelize.transaction(function (t) {
      return Media.bulkCreate(
         medias,
         {transaction: t, returning: true, individualHooks: true}).then(function (createMedia) {

         for (var i = 0; i < createMedia.length; ++i) {

            m_relation.push({
               post_id: imageJSON.postID,
               media_id: createMedia[i].ID
            });
         }

         return Post_Media_relationship.bulkCreate(
            m_relation,
            {transaction: t, returning: true, individualHooks: true});
      })
   }).then(function (result) {
      //정상적으로 되었을 경우
      res.status(200).json({
         statusCode: 1
      });

      return models.sequelize.Promise.resolve(result);
   }).catch(function (err) {
      //에러 발생했을 경우
      res.status(401).json({
         errorMsg: 'DB create error',
         statusCode: -1
      });

      return models.sequelize.Promise.reject(err);
   });
}

// vr 이미지 DB
exports.createVRImageVtourInfo = function (req, res, next) {

   let token = req.headers['authorization'];
   //토큰 확인
   if (!token) {
      return res.status(400).json({
         errorMsg: 'Do not have a token',
         statusCode: -1
      });
   }

   let vrJSON;
   for (var key in req.body) {
      vrJSON = JSON.parse(key);
   }

   let vrFilePath = "/medias/vrimages";
   let vtourPath = "/medias/vtours";

   let vrImages = [];
   let medias_relation = [];

   let post_vrimages = [];
   let post_thumb_image_path = [];

   // vrimage 정보 저장
   for (let i = 0; i < vrJSON.vrImages.length; ++i) {

      let vrType = vrJSON.vrImages[i].type;

      let vrImageMetaValue = {
         mimetype: vrJSON.vrImages[i].mimetype,
         size: vrJSON.vrImages[i].size,
         real_file_name: vrJSON.vrImages[i].real_file_name,
      };

      vrImages.push({
         user_id: req.user.ID,
         type: vrType,
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: vrFilePath + '/' + req.user.email,
         file_name: vrJSON.vrImages[i].file_name,
         meta_value: vrImageMetaValue
      });
   }

   return models.sequelize.transaction(function (t) {
      return Media.bulkCreate(
         vrImages, {transaction: t, returning: true, individualHooks: true}).then(function (vrimages) {

         // vrimage, vtour의 릴레이션을 표시하기위해서
         // post_media_relationship 테이블에 넣기 위해 JSON을 만드는 부분
         // 예제 >> { post_id : id , media_id : id }

         // vtour 정보 저장
         let vtourInfo = {
            user_id: req.user.ID,
            type: vrJSON.vtour.type,
            date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
            file_path: "/medias/vtours/" + vrJSON.vtour.file_path,
            file_name: vrJSON.vtour.file_name,
            meta_value: {
               tiles: [],
               thumbnail_image_name: vrJSON.vtour.thumbnail_image_name,  // 단일면 이미지
               preview_image_name: vrJSON.vtour.preview_image_name,  // 세로형 이미지(각 면->하나의 이미지)
               mobile_dir_name: vrJSON.vtour.mobile_dir_name  // 모바일용 이미지 저장 폴더 이름
            }
         };

         _.forEach(vrimages, (vrimage, i) => {
            medias_relation.push({
               post_id: vrJSON.postID,
               media_id: vrimage.ID
            });

            if (vrimage.type === "VR_IMAGE") {
               vtourInfo.meta_value.tiles.push({
                  ID: vrimage.ID,
                  dir_name: path.basename(vrimage.file_name, path.extname(vrimage.file_name)) + ".tiles"
               });
            }
         });

         return Media.create(
            vtourInfo, {transaction: t, returning: true, individualHooks: true}).then(function (vtour) {

            medias_relation.push({
               post_id: vrJSON.postID,
               media_id: vtour.ID
            });

            _.forEach(vtour.meta_value.tiles, (tile, i) => {
               post_vrimages.push({
                  ID: tile.ID,
                  thumb: vtour.file_path + '/panos/' + tile.dir_name + "/thumb.jpg"
               });
            });

            post_thumb_image_path.push({
               ID: vtour.ID,
               vrimages: post_vrimages
            })

            return Post_Media_relationship.bulkCreate(
               medias_relation,
               {transaction: t, returning: true, individualHooks: true}
            );
         });
      });
   }).then(() => {
      //정상 완료

      return post.update({
         thumbnail_image_path: post_thumb_image_path,
      }, {
         where: {
            ID: vrJSON.postID
         }
      }).then(() => {
         res.status(200).json({
            statusCode: 1
         });
      });
   }).catch(next);
}


//게시글 출력
exports.viewPosts = function (req, res) {
   let pageSize, pageStartIndex;
   //이메일을 통해서 찜목록과 좋아요목록 조회를 함.
   const email = req.query.email;

   // 페이지 정보 확인
   if (!req.query.pageSize || !req.query.pageStartIndex) {
      // query가 제대로 오지 않으면 초기값으로 보낸다.
      pageSize = 10;
      pageStartIndex = 0;
   } else {
      pageSize = _.toNumber(req.query.pageSize);
      pageStartIndex = _.toNumber(req.query.pageStartIndex);
   }

   //post리스트를 조회
   return models.sequelize.query("select u.email, u.display_name, p.*, r.* from users as u, post as p, room as r " +
      "where u.ID = p.user_id and p.id = r.post_id and p.post_type = 'room' limit ?,?",
      {replacements: [pageStartIndex, pageSize], type: models.sequelize.QueryTypes.SELECT}
   ).then(function (postList) {
      //post정보가 없을때
      if (postList.length == 0) {
         return res.status(400).json({
            errorMsg: '정보 없음',
            statusCode: -1
         });
      } else {
         //만약 이메일이 없을 경우에는 찜목록이랑 좋아요 목록이 필요없음.
         if (!email) {
            return res.status(200).json({
               postList: postList,
               likeList: '',
               jjimList: '',
               statusCode: 1
            });
         } else {
            //이메일이 있는경우에는 찜목록이랑 좋아요 목록 필요
            //찜목록 조회
            return models.sequelize.query("select post_id from user_post_relationships where user_id = " +
               "(select ID from users where email= (?))",
               {replacements: [email], type: models.sequelize.QueryTypes.SELECT}
            ).then(function (jjimList) {
               //좋아요 목록 조회
               return models.sequelize.query("select post_id as post_like_id from user_post_like_relationships where user_id = " +
                  "(select ID from users where email= (?))",
                  {replacements: [email], type: models.sequelize.QueryTypes.SELECT}
               ).then(function (likeList) {
                  // 모든 데이터를 Jsom으로 만들어서 전송
                  return res.status(200).json({
                     postList: postList,
                     likeList: likeList,
                     jjimList: jjimList,
                     statusCode: 1
                  });
               }).catch(function (err) {
                  return res.status(400).json({
                     errorMsg: 'DB 좋아요 select error',
                     statusCode: -2
                  });
               });
            }).catch(function (err) {
               return res.status(400).json({
                  errorMsg: 'DB 찜하기 select error',
                  statusCode: -2
               });
            });
         }
      }
   }).catch(function (err) {
      return res.status(400).json({
         errorMsg: 'DB room select error',
         statusCode: -2
      });
   });
}

//게시글 클릭시 룸 세부정보 볼수있게 하는 API
exports.viewRoomDetail = function (req, res) {

   const roomInfoIdx = req.params.roomInfoIdx;
   //이메일을 통해서 찜목록과 좋아요목록 조회를 함.
   const email = req.query.email;

   //룸 세부정보 조회
   return models.sequelize.query("select u.email, u.display_name, u.telephone, p.*, r.* " +
      "from users as u, post as p, room as r " +
      "where u.ID = p.user_id and p.id = r.post_id and p.id = (?) and p.post_type = 'room'",
      {replacements: [roomInfoIdx], type: models.sequelize.QueryTypes.SELECT}
   ).then(function (detailList) {
      //세부정보가 없을 때
      if (detailList.length == 0) {
         return res.status(400).json({
            errorMsg: '정보 없음',
            statusCode: -1
         });
      } else {
         //meida table에서 얻어오는 부분
         return models.sequelize.query("select * from medias where ID in (select media_id from post_media_relationships where post_id = (?))",
            {replacements: [roomInfoIdx], type: models.sequelize.QueryTypes.SELECT}
         ).then(function (mediasList) {
            //만약 이메일이 없을 경우에는 찜목록이랑 좋아요 목록이 필요없음.
            if (!email) {
               return res.status(200).json({
                  detailList: detailList,
                  mediasList: mediasList,
                  jjimList: '',
                  likeList: '',
                  statusCode: 1
               });
            }
            else {
               //이메일이 있는경우에는 찜목록이랑 좋아요 목록 필요
               //찜목록 조회
               return models.sequelize.query("select post_id from user_post_relationships where user_id = " +
                  "(select ID from users where email= (?))",
                  {replacements: [email], type: models.sequelize.QueryTypes.SELECT}
               ).then(function (jjimList) {
                  //좋아요 목록 조회
                  return models.sequelize.query("select post_id as post_like_id from user_post_like_relationships where user_id = " +
                     "(select ID from users where email= (?))",
                     {replacements: [email], type: models.sequelize.QueryTypes.SELECT}
                  ).then(function (likeList) {
                     // 모든 데이터를 Jsom으로 만들어서 전송
                     return res.status(200).json({
                        detailList: detailList,
                        mediasList: mediasList,
                        jjimList: jjimList,
                        likeList: likeList,
                        statusCode: 1
                     });
                  }).catch(function (err) {
                     return res.status(400).json({
                        errorMsg: 'DB 좋아요 select error',
                        statusCode: -2
                     });
                  });
               }).catch(function (err) {
                  return res.status(400).json({
                     errorMsg: 'DB 찜하기 select error',
                     statusCode: -2
                  });
               });
            }
         }).catch(function (err) {
            return res.status(400).json({
               errorMsg: 'DB select post error',
               statusCode: -2
            });
         });
      }
   })
};

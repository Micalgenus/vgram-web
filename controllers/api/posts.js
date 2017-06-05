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
exports.createNormalImageInfo = function (req, res) {

   //  /api/post/normal-image

   let token = req.headers['authorization'];
   //토큰 확인
   if (!token) {
      return res.status(400).json({
         errorMsg: 'Do not have a token',
         statusCode: -1
      });
   }

   let postId = req.body.postId;
   let userID =  req.user.ID;
   let email =  req.user.email;
   let imageType = req.body.images.type;
   let imageFileName = req.body.images.file_name;

   const imageMetaValue = {
      mimetype: req.body.images.mimetype,
      size: req.body.images.size,
      desktop_dir: req.body.images.desktop_dir_name,
      mobile_dir: req.body.images.mobile_dir_name,
      original_dir: req.body.images.original_dir_name
   }

   return models.sequelize.transaction(function (t) {

      //media 테이블 추가
      return Media.create({
         user_id: userID,
         type : imageType,
         date : moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: "/medias/images/" + email,
         file_name: imageFileName,
         meta_value: imageMetaValue
      }, {transaction: t}).then(function (createMedia) {
         return Post_Media_relationship.create({
            post_id : postId,
            media_id : createMedia.ID
         }, {transaction: t});
      }).then(function (result) {
         //정상적으로 되었을 경우
         return res.status(200).json({
            statusCode: 1
         });
      }).catch(function (err) {
         //에러 발생했을 경우
         return res.status(401).json({
            errorMsg: 'DB create error',
            statusCode: -1
         });
      });
   });
}

// vr 이미지 DB
exports.createVRImageVtourInfo = function (req, res) {

   let token = req.headers['authorization'];
   //토큰 확인
   if (!token) {
      return res.status(400).json({
         errorMsg: 'Do not have a token',
         statusCode: -1
      });
   }

   let postID = req.body.postId;
   let userID = req.user.ID;
   let email = req.user.email;
   let vrType = req.body.vrImages.type;
   let vrFileName = req.body.vrImages.file_name;
   let vrFilePath = "/medias/vrimages/" +  email;
   const vrMetaValue = {
      mimetype: req.body.vrImages.mimetype,
      size: req.body.vrImages.size,
      tile_dir_name: req.body.vrImages.tile_dir_name,
      thumbnail_image_name: req.body.vrImages.thumbnail_image_name,// 단일면 이미지
      preview_image_name: req.body.vrImages.preview_image_name,// 세로형 이미지(각 면->하나의 이미지)
      mobile_dir_name: req.body.vrImages.mobile_dir_name  // 모바일용 이미지 저장 폴더 이름
   }

   let vtourType = req.body.vtour.type;
   let vtourFileName = req.body.vtour.file_name;
   let vtourFilePath = "/medias/vtours/" +  email + req.body.vtour.size ;
   const vtourMetaValue = {

   };
   //vr이미지 입력


   models.sequelize.transaction(function (t) {

      //media 테이블 추가
      return Media.create({
         user_id : userID,
         type: vrType,
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path:  vrFilePath,
         file_name: vrFileName,
         meta_value: vrMetaValue
      }, {transaction: t}).then(function (createMedia) {
         return Post_Media_relationship.create({
            post_id : postID,
            media_id : createMedia.ID
         }, {transaction: t});
      }).then(function (result) {

      }).catch(function (err) {
        // console.log(err);
         return res.status(401).json({
            errorMsg: 'DB create error',
            statusCode: -1
         });
      });
   });

   //vtour 정보 입력
   return models.sequelize.transaction(function (t) {
      //media 테이블 추가
      return Media.create({
         user_id : userID,
         type: vtourType,
         date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
         file_path: vtourFilePath,
         file_name: vtourFileName,
         meta_value: vtourMetaValue
      }, {transaction: t}).then(function (createVtour) {
         return Post_Media_relationship.create({
            post_id : postID,
            media_id : createVtour.ID
         }, {transaction: t});

      }).then(function (result) {
         return res.status(200).json({
            statusCode: 1
         });
      }).catch(function (err) {
         return res.status(401).json({
            errorMsg: 'DB create vtour error',
            statusCode: -1
         });
      });
   }
   //vr이미지 입력
   // return models.sequelize.transaction(function (t) {
   //
   //    //media 테이블 추가
   //    return Media.create({
   //       user_id : req.user.id,
   //       group: null,
   //       type: req.body.vrImages.type,
   //       date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
   //       file_path:  '/medias/vrimages/' +  req.user.email,
   //       file_name: req.body.vrImages.file_name,
   //       meta_value: req.vrImages
   //    }, {transaction: t}).then(function (createMedia) {
   //       return Post_Media_relationship.create({
   //          post_id : req.postId,
   //          media_id : creatMedia.ID
   //       }, {transaction: t});
   //
   //    }).then(function (result) {
   //
   //       return res.status(200).json({
   //          statusCode: 1
   //       });
   //    }).catch(function (err) {
   //       return res.status(401).json({
   //          errorMsg: 'DB create error',
   //          statusCode: -1
   //       });
   //    });
   // });
   //
   // //vtour 정보 입력
   // return models.sequelize.transaction(function (t) {
   //    //media 테이블 추가
   //    return Media.create({
   //       user_id : req.user.id,
   //       group: null,
   //       type: req.body.vtour.type,
   //       date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
   //       file_path: "/medias/vtours/" +  req.user.email + req.body.vtour.size ,
   //       file_name: req.vtour.file_name,
   //       meta_value: req.vtour
   //    }, {transaction: t}).then(function (createMedia) {
   //       return Post_Media_relationship.create({
   //          post_id : req.postId,
   //          media_id : createMedia.ID
   //       }, {transaction: t});
   //
   //    }).then(function (result) {
   //       return res.status(200).json({
   //          statusCode: 1
   //       });
   //    }).catch(function (err) {
   //       return res.status(401).json({
   //          errorMsg: 'DB create error',
   //          statusCode: -1
   //       });
   //    });
   // });
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
         if(!email){
            return res.status(200).json({
               postList: postList,
               likeList: '',
               jjimList: '',
               statusCode: 1
            });
         }else{
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
            if(!email) {
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

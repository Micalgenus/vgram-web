/**
 * Created by JHLee on 2017-01-25.
 */
"use strict";

const models = require('../../models');
const posts = models.posts;
const rooms = models.rooms;
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
      "from users as u, posts as p where u.ID = p.user_id and p.post_type = 'notice' limit ?,?",
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
   return models.sequelize.query("select u.email, u.display_name, p.*, r.* from users as u, posts as p, rooms as r " +
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
      "from users as u, posts as p, rooms as r " +
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
               errorMsg: 'DB select posts error',
               statusCode: -2
            });
         });
      }
   })
};

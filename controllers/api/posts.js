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

   return models.sequelize.query("select users.email, users.display_name, b.* " +
      "from users as users, posts as b where users.ID = b.user_id and b.post_type = 'notice' limit ?,?",
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

   // 페이지 정보 확인
   if (!req.query.pageSize || !req.query.pageStartIndex) {
      // query가 제대로 오지 않으면 초기값으로 보낸다.
      pageSize = 10;
      pageStartIndex = 0;
   } else {
      pageSize = _.toNumber(req.query.pageSize);
      pageStartIndex = _.toNumber(req.query.pageStartIndex);
   }

   return models.sequelize.query("select a.email, a.display_name, b.*, c.* from users as a, posts as b, rooms as c " +
      "where a.ID = b.user_id and b.id = c.post_id and b.post_type = 'room' limit ?,?",
      {replacements: [pageStartIndex, pageSize], type: models.sequelize.QueryTypes.SELECT}
   ).then(function (postList) {
      if (postList.length == 0) {
         return res.status(400).json({
            errorMsg: '정보 없음',
            statusCode: -1
         });
      } else {
         return res.status(200).json({
            postList: postList,
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

//게시글 클릭시 룸 세부정보 볼수있게 하는 API
exports.viewRoomDetail = function (req, res) {

   const roomInfoIdx = req.params.roomInfoIdx;

   return models.sequelize.query("select    u.email, u.display_name, u.telephone,   p.*,   r.*,   m.*   " +
      "from users as u,   posts as p,   rooms as r,   post_media_relationships as pmr,   medias as m" +
      "   where   p.ID = (?) and   p.user_id = u.ID and   r.post_id = p.id and   p.post_type = 'room' and   pmr.post_id = (?) and   pmr.media_id = m.ID   ",
   // return models.sequelize.query("select a.email, a.display_name, a.telephone, b.*, c.* " +
   //    "from users as a, posts as b, rooms as c " +
   //    "where a.ID = b.user_id and b.id = c.post_id and b.id = (?) and b.post_type = 'room'",
       {replacements: [roomInfoIdx], type: models.sequelize.QueryTypes.SELECT}
   ).then(function (detailList) {
      if (detailList.length == 0) {
         return res.status(400).json({
            errorMsg: '정보 없음',
            statusCode: -1
         });
      } else {
         return res.status(200).json({
            detailList: detailList,
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

// exports.addPost = function (req, res, next) {
//
//    const title = req.body.tile;
//
//    // Return error if no email provided
//    if (!email) {
//       return res.status(400).send({
//          errorMsg: 'You must enter an title.',
//          statusCode: -1
//       });
//    }
//
//    let data = {
//       title: title
//    };
//
//    return models.sequelize.transaction(function (t) {
//       return posts.create(data, {transaction: t}).then(function (postsResult) {
//
//
//          // Respond with JWT if user was created
//          newUser.passwordOrigin = password;    // 인코딩 전의 패스워드 저장
//          let userInfo = genToken.setUserInfo(newUser);
//          let bizMember = {
//             memberIdx: newUser.idx
//          };
//
//          return rooms.create(bizMember, {transaction: t}).then(function (roomsResult) {
//             return models.sequelize.Promise.resolve(userInfo);
//          });
//       })
//    }).then(function (userInfo) {    // commit구간
//       let token = 'Bearer ' + genToken.generateUserToken(userInfo);
//       res.append('Authorization', token);
//
//       res.status(201).json({
//          user: userInfo,
//          status: 1
//       });
//
//       return models.sequelize.Promise.resolve(userInfo);
//    }).catch(function (err) {    // end sequelize.transaction, rollback구간
//       if (err) {
//          res.status(422).json({errorMsg: 'Internal Error', statusCode: 9});
//          return models.sequelize.Promise.reject(err);
//       }
//    });
// }

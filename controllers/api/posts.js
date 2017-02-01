/**
 * Created by JHLee on 2017-01-25.
 */
"use strict";

const models = require('../../models');
const posts = models.posts;
const _ = require('lodash');
const Promise = require("bluebird");
const moment = require("moment");

//공지사항 출력
exports.viewNotice = function(req, res) {
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

   return models.sequelize.query("select users.email, users.display_name, b.* "+
      "from users as users, posts as b where users.ID = b.user_id and b.post_type = 'notice' limit ?,?",
      { replacements: [pageStartIndex, pageSize], type: models.sequelize.QueryTypes.SELECT }
   ).then(function(noticeList) {
      if(noticeList.length == 0){
         return res.status(400).json({
            errorMsg: '정보 없음',
            statusCode: -1
         });
      }else{
         return res.status(200).json({
            noticeList: noticeList,
            statusCode: 1
         });
      }
   }).catch(function(err) {
      return res.status(400).json({
         errorMsg: 'DB select error',
         statusCode: -2
      });
   });
}

//게시글 출력
exports.viewPosts = function(req, res) {
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

   return models.sequelize.query("select users.email, users.display_name, b.* "+
      "from users as users, posts as b where users.ID = b.user_id and b.post_type = 'room' limit ?,?",
      { replacements: [pageStartIndex, pageSize], type: models.sequelize.QueryTypes.SELECT }
   ).then(function(postList) {
      if(postList.length == 0){
         return res.status(400).json({
            errorMsg: '정보 없음',
            statusCode: -1
         });
      }else{
         return res.status(200).json({
            postList: postList,
            statusCode: 1
         });
      }
   }).catch(function(err) {
      return res.status(400).json({
         errorMsg: 'DB select error',
         statusCode: -2
      });
   });
}

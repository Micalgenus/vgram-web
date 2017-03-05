/**
 * Created by KIMSEONHO on 2016-11-12.
 * setting sequelize test database, include in member.
 */

const log = require('console-log-level')({
   prefix: function () {
      return new Date().toISOString()
   },
   level: 'debug'
});

var models = require("../models");

module.exports = function(testDB) {
   if (testDB) {
      log.debug('---1--- \n Create Test Database : user');

      return models.user.bulkCreate(testDB.user).then(function () {
         log.debug('---2--- \n Create Test Database : user_meta ');
         return models.user_meta.bulkCreate(testDB.user_meta);
      }).then(function () {
         log.debug('---3---- \n Create Test Database : post');
         return models.post.bulkCreate(testDB.post);
      }).then(function () {
         log.debug('---4---- \n Create Test Database : post_meta');
         return models.post_meta.bulkCreate(testDB.post_meta);
      }).then(function () {
         log.debug('---5---- \n Create Test Database : attached');
         return models.attached.bulkCreate(testDB.attached);
      }).then(function () {
         log.debug('---6---- \n Create Test Database : media');
         return models.media.bulkCreate(testDB.media);
      }).then(function () {
         log.debug('---7---- \n Create Test Database : room');
         return models.room.bulkCreate(testDB.room);
      }).then(function () {
         log.debug('---8---- \n Create Test Database : post_media_relationship');
         return models.post_media_relationship.bulkCreate(testDB.post_media_relationship);
      }).then(function () {
         log.debug('---9---- \n Create Test Database : post_attached_relationship');
         return models.post_attached_relationship.bulkCreate(testDB.post_attached_relationship);
      }).then(function () {
         log.debug('---10---- \n Create Test Database : user_post_relationship');
         return models.user_post_relationship.bulkCreate(testDB.user_post_relationship);
      }).then(function () {
         log.debug('---11---- \n Create Test Database : user_user_relationship');
         return models.user_user_relationship.bulkCreate(testDB.user_user_relationship);
      }).then(function () {
         log.debug('---12---- \n Create Test Database : user_post_like_relationship');
         return models.user_post_like_relationship.bulkCreate(testDB.user_post_like_relationship);
      }).then(function () {
         log.debug('---13---- \n Create Test Database : hash_table');
         return models.hash_table.bulkCreate(testDB.hash_table);
      }).then(function () {
         log.debug('Complete create Test Database');
         return models.sequelize.Promise.resolve('Complete create Test Database');
      }).catch(function (err) {
         log.debug('create Test Database Error ' + err);
         return models.sequelize.Promise.reject(err);
      });

   } else {
      return models.sequelize.Promise.reject('no testDB is found');
   }
}

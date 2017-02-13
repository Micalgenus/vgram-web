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
    log.debug('---1--- \n Create Test Database : users');

    return models.users.bulkCreate(testDB.users).then(function () {
       log.debug('---2--- \n Create Test Database : user_metas ');
       return models.user_metas.bulkCreate(testDB.user_metas);
    }).then(function () {
       log.debug('---3---- \n Create Test Database : posts');
       return models.posts.bulkCreate(testDB.posts);
    }).then(function () {
       log.debug('---4---- \n Create Test Database : post_metas');
       return models.post_metas.bulkCreate(testDB.post_metas);
    }).then(function () {
       log.debug('---5---- \n Create Test Database : attached');
       return models.attached.bulkCreate(testDB.attached);
    }).then(function () {
       log.debug('---6---- \n Create Test Database : medias');
       return models.medias.bulkCreate(testDB.medias);
    }).then(function () {
       log.debug('---7---- \n Create Test Database : rooms');
       return models.rooms.bulkCreate(testDB.rooms);
    }).then(function () {
       log.debug('---8---- \n Create Test Database : post_media_relationships');
       return models.post_media_relationships.bulkCreate(testDB.post_media_relationships);
    }).then(function () {
       log.debug('---9---- \n Create Test Database : post_attached_relationships');
       return models.post_attached_relationships.bulkCreate(testDB.post_attached_relationships);
    }).then(function () {
       log.debug('---10---- \n Create Test Database : user_post_relationships');
       return models.user_post_relationships.bulkCreate(testDB.user_post_relationships);
    }).then(function () {
       log.debug('---11---- \n Create Test Database : user_user_relationships');
       return models.user_user_relationships.bulkCreate(testDB.user_user_relationships);
    }).then(function () {
       log.debug('---12---- \n Create Test Database : user_post_like_relationships');
       return models.user_post_like_relationships.bulkCreate(testDB.user_post_like_relationships);
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

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
    log.debug('---1--- Create Users Test Database');
     //2017.1.13 이정현 주석처리

    return models.Users.bulkCreate(testDB.Users).then(function () {
       log.debug('---2--- Create UserMetas Test Database');
       return models.UserMetas.bulkCreate(testDB.UserMetas);
    });
     //2017.1.13 이정현 주석처리
     //return models.Member.bulkCreate(testDB.member).then(function () {
      //     log.debug('---2--- Create BusinessMember Test Database');
      //    return models.BusinessMember.bulkCreate(testDB.businessMember);
      // });
    // }).then(function () {
    //   log.debug('Create BusinessMember Test Database');
    //   return models.BuildCaseInfoBoard.bulkCreate(testDB.buildCaseInfoBoard);
    // }).then(function () {
    //   log.debug('Create UserConsultInfoBoard Test Database');
    //   return models.UserConsultInfoBoard.bulkCreate(testDB.userConsultInfoBoard);
    // }).then(function () {
    //   log.debug('Create RoomInfoBoard Test Database');
    //   return models.RoomInfoBoard.bulkCreate(testDB.roomInfoBoard);
    // }).then(function () {
    //   log.debug('Complete create Test Database');
    //   return models.sequelize.Promise.resolve('Complete create Test Database');
    // }).catch(function (err) {
    //   log.debug('create Test Database Error ' + err);
    //   return models.sequelize.Promise.reject(err);
    // });
  } else {
    return models.sequelize.Promise.reject('no testDB is found');
  }
}

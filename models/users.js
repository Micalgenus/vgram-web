/* jshint indent: 2 */
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    ID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    member_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null
    },
    registered_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    display_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null
    },
    activation_key: {
      type: DataTypes.STRING(127),
      allowNull: true,
      defaultValue: null
    },
    locale: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: 'ko_KR'
    },
     profile_image_path: {
       type: DataTypes.STRING(255),
       allowNull: true,
       defaultValue: null
     },
     updated_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
     },
     user_status: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 1
     },
     meta_value:{
        type: DataTypes.STRING(511),
        allowNull: false,
        defaultValue: null
     }
  }, {
    tableName: 'users',
     instanceMethods: {
        // Method to compare password for login
        // instance level에서 접근을 해야 this 사용이 가능함.
        /**
         *
         * @param candidatePassword data to compare
         * @param cb callback
         */
        comparePassword: function(candidatePassword, cb) {
           var self = this;
           //bcrypt.compare(data, encrypted, cb)
           // data - [REQUIRED] - data to compare.
           //  encrypted - [REQUIRED] - data to be compared to.
           //  callback - [REQUIRED] - a callback to be fired once the data has been compared.
           //   error - First parameter to the callback detailing any errors.
           //   result - Second parameter to the callback providing whether the data and encrypted forms match [true | false].
           bcrypt.compareAsync(candidatePassword, self.password).then(function(isMatch) {
              return cb(null, isMatch);
           }).catch(function(err) {
              if (err) {
                 return cb(err);
              }
           });
        }
     },
     hooks: {
        beforeValidate: function(member, options) {
           const SALT_FACTOR = 5;
            //비밀번호 변경되야지만 update되서 주석처리해놓음
           //2017.1.23 이정현 주석처리
           // if (!member.changed('password')) {
           //    return sequelize.Promise.reject("not modified");
           // }

           // bcrypt가 async이기 때문에 promise
           return bcrypt.genSaltAsync(SALT_FACTOR).then(function(salt) {
              return bcrypt.hashAsync(member.password, salt, null);
           }).then(function(hash) {
              member.setDataValue('password', hash);
           }).catch(function(err) {
              return sequelize.Promise.reject(err);
           });
        }
     }
  });
   return users;
};

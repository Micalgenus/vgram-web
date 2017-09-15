/* jshint indent: 2 */
"use strict";

const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
const _ = require("lodash");
const config = require("../config/main");

module.exports = function(sequelize, DataTypes) {
   var user = sequelize.define('user', {
      ID: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      email: {
         type: DataTypes.STRING(200),
         allowNull: false,
         unique: true
      },
      member_type: {
         type: DataTypes.STRING(45),
         allowNull: false
      },
      nickname: {
         type: DataTypes.STRING(45),
         allowNull: false,
         defaultValue: null
      },
      user_status: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 1      // -1 : 탈퇴요청, 0 : 휴면, 1 : 활성
      },

      telephone: {
         type: DataTypes.STRING(45),
         allowNull: true,
         defaultValue: null      // (ex>"010-2800-2109")
      },
      createdAt: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW
      },
      auth0_user_id: {
         type: DataTypes.STRING(127),
         allowNull: false,
         unique: true
      },
      locale: {
         type: DataTypes.STRING(45),
         allowNull: false,
         defaultValue: 'ko_KR'
      },
      profile_image_path: {
         type: DataTypes.STRING(255),
         allowNull: true,
         defaultValue: null,
        get() {
           // image_path에 host 주소가 없는 경우를 구분하여 host 주소를 붙여줌
           let profile_image_path = this.getDataValue('profile_image_path');

          if(_.includes(profile_image_path, "http://")
            || _.includes(profile_image_path, "https://")) {
            return profile_image_path;
          } else {
            return [config.mediaUrl, profile_image_path].join('/');
          }
        }
      },
      updatedAt: {
         type: DataTypes.DATE,
         allowNull: true,
         defaultValue: null
      },

      meta_value:{
         type: DataTypes.JSON,
         allowNull: true,
         defaultValue: null
      }
   }, {
      tableName: 'user',
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
            return bcrypt.compareAsync(candidatePassword, self.password).then(function(isMatch) {
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
      },
      classMethods: {
         associate: function(models) {

            user.belongsToMany(user, {
               // constraints: false,
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               through: models.user_user_relationship,
               foreignKey: {
                  name: 'user_id',
                  allowNull: false
               },
               otherKey: {
                  name: 'user_target_id',
                  allowNull: false
               },
               as: "Subscribes"
            });

            user.hasOne(models.user_meta, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               foreignKey: {
                  name: 'user_id',
                  allowNull: false
               },
               sourceKey: "ID"
            });

            // This will add methods getPosts, setProjects, addProject, and addProjects to User.
            // and getProjects, setProjects, addProject, and addProjects to User.
            user.belongsToMany(models.post, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               through: models.user_post_like_relationship,
               foreignKey: {
                  name: 'user_id',
                  allowNull: false
               },
               as: "LikePosts"
            });

            user.hasMany(models.post, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               foreignKey: {
                  name: 'user_id',
                  allowNull: false
               },
               sourceKey: "ID",
               as: "Posts"
            });

            user.hasMany(models.attached, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               foreignKey: {
                  name: 'user_id',
                  allowNull: false
               },
               sourceKey: "ID"
            });

            user.hasMany(models.media, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               foreignKey: {
                  name: 'user_id',
                  allowNull: false
               },
               sourceKey: "ID"
            });


         }
      }
   });
   return user;
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
   var post = sequelize.define('post', {
      ID: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      user_id: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
         references: {
            model: 'user',
            key: 'ID'
         }
      },
      title: {
         type: DataTypes.TEXT,
         allowNull: true,
         defaultValue: null
      },
      content: {
         type: DataTypes.TEXT,
         allowNull: true,
         defaultValue: null
      },

      post_status: {
         type: DataTypes.CHAR(20),
         allowNull: false,
         defaultValue: 'PUBLISH'
      },
      post_type: {
         type: DataTypes.STRING(45),
         allowNull: false,
         defaultValue: 'NORMAL'
      },
      locale: {
         type: DataTypes.STRING(45),
         allowNull: false,
         defaultValue: 'ko_kr'
      },

      createdAt: {
         type: DataTypes.DATE,
         allowNull: false
      },
      updatedAt: {
         type: DataTypes.DATE,
         allowNull: false
      },
      thumbnail_image_path: {
         type: DataTypes.JSON,
         allowNull: true,
         defaultValue: null
      },

      like: {
         type: DataTypes.INTEGER(10).UNSIGNED,
         allowNull: true,
         defaultValue: 0
      },
      read_count: {
         type: DataTypes.INTEGER(10).UNSIGNED,
         allowNull: true,
         defaultValue: 0
      },
      comment_count: {
         type: DataTypes.INTEGER(10).UNSIGNED,
         allowNull: true,
         defaultValue: 0
      },
      meta_value: {
         type: DataTypes.JSON,
         allowNull: true
      }
   }, {
      tableName: 'post',
      classMethods: {

         associate: function(models) {
            post.hasOne(models.post_meta, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               foreignKey: {
                  name: 'post_id',
                  allowNull: false
               },
               sourceKey: "ID"
            });

            post.belongsToMany(models.user, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               through: models.user_post_like_relationship,
               foreignKey: {
                  name: 'post_id',
                  allowNull: false
               },
               as: "LikeUsers"
            });

            post.belongsTo(models.user, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               foreignKey: {
                  name: 'user_id',
                  allowNull: false
               },
               targetKey: "ID"
            });

            post.belongsToMany(models.attached, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               through: models.post_attached_relationship,
               foreignKey: {
                  name: 'post_id',
                  allowNull: false
               }
            });

            post.belongsToMany(models.media, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               through: models.post_media_relationship,
               foreignKey: {
                  name: 'post_id',
                  allowNull: false
               }
            });

            post.hasOne(models.room, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               foreignKey: {
                  name: 'post_id',
                  allowNull: false
               },
               sourceKey: "ID"
            });

            post.belongsToMany(models.tag, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               through: models.tag_relationship,
               foreignKey: {
                  name: 'post_id',
                  allowNull: false
               }
            });

            post.hasOne(models.icl_translation, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               foreignKey: {
                  name: 'element_id',
                  allowNull: false
               },
               sourceKey: "ID"
            });

            post.hasMany(models.comment, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               foreignKey: {
                  name: 'post_id',
                  allowNull: false
               },
               sourceKey: "ID",
               as: "Comments"
            });

         }
      }
   });

   return post;
};

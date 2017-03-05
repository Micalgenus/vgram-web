/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    ID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'ID'
      }
    },
    post_init_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    post_init_date_gmt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },
    post_status: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      defaultValue: 'private'
    },
    post_modified_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    post_modified_date_gmt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    post_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    read_count: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    like: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    locale: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: 'ko_KR'
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

           post.belongsToMany(models.user, {
              onUpdate: "CASCADE",
              onDelete: "CASCADE",
              through: models.user_post_relationship,
              foreignKey: {
                 name: 'post_id',
                 allowNull: false
              },
              as: "WishUsers"
           });

           post.belongsTo(models.user, {
              onUpdate: "CASCADE",
              onDelete: "CASCADE",
              foreignKey: {
                 name: 'user_id',
                 allowNull: false
              },
              targetKey: "ID",
              as: "Author"
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

        }
     }
  });

   return post;
};

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  var media = sequelize.define('media', {
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
    group: {
      type: DataTypes.STRING(127),
      allowNull: true,
      defaultValue: null
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    file_path: {
      type: DataTypes.STRING(127),
      allowNull: false

    },
    file_name: {
      type: DataTypes.STRING(127),
      allowNull: false
    },
    meta_value: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    }
  }, {
    tableName: 'media',
    getterMethods: {},
    classMethods: {
      associate: function (models) {

        media.belongsToMany(models.post, {
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          through: models.post_media_relationship,
          foreignKey: {
            name: 'media_id',
            allowNull: false
          },
          as: "UseCases"
        });

        // media.hasOne(models.room, {
        //    onUpdate: "CASCADE",
        //    onDelete: "RESTRICT",
        //    foreignKey: {
        //       name: 'thumbnail_media_id',
        //       allowNull: false
        //    },
        //    sourceKey: "ID",
        //    as: "ThumbImage"
        // });

        media.belongsTo(models.user, {
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          foreignKey: {
            name: 'user_id',
            allowNull: false
          },
          targetKey: "ID"
        });
      }
    },
    instanceMethods: {
      getDevicePath: function (device) {  // device path를 결합하여 return함
        // https://github.com/rguerreiro/express-device
        if (this.getDataValue("type") === "NORMAL_IMAGE") {
          if (device === "desktop" || device === "tv") {
            return [this.getDataValue("file_path"), "desktop"].join("/");
          } else if (device === "tablet" || device === "phone") {
            return [this.getDataValue("file_path"), "mobile"].join("/");
          } else {
            return [this.getDataValue("file_path"), "desktop"].join("/");  // default
          }
        } else {  // NORMAL_IMAGE가 아닌경우
          return this.getDataValue("file_path");
        }
      }
    },
    indexes: [
      // Create a unique index on ID, user_id
      {
        primaryKey: true,
        fields: ['ID', 'user_id']
      }
    ]
  });

  return media;
};

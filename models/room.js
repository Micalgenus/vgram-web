/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
   var room = sequelize.define('room', {
      ID: {
         type: DataTypes.INTEGER(11).UNSIGNED,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      post_id: {
         type: DataTypes.INTEGER(11).UNSIGNED,
         allowNull: false,
         references: {
            model: 'post',
            key: 'ID'
         }
      },
      room_type: {
         type: DataTypes.STRING(45),
         allowNull: false
      },
      post_code: {
         type: DataTypes.STRING(45),
         allowNull: false,
      },
      address: {
         type: DataTypes.JSON,
         allowNull: false
      },
      old_address: {
         type: DataTypes.JSON,
         allowNull: true,
         defaultValue: null
      },
      old_address_dong: {
         type: DataTypes.STRING(255),
         allowNull: true,
         defaultValue: null
      },
      coordinate: {
         type: DataTypes.JSON,
         allowNull: false
      },
      thumbnail_image_path: {
         type: DataTypes.JSON,
         allowNull: false
      },
      thumbnail_media_id: {
         type: DataTypes.INTEGER(11).UNSIGNED,
         allowNull: false,
         references: {
            model: 'media',
            key: 'ID'
         }
      },
      deposit: {
         type: DataTypes.INTEGER(10).UNSIGNED,
         allowNull: true,
         defaultValue: null
      },
      monthly_rent_fee: {
         type: DataTypes.INTEGER(10).UNSIGNED,
         allowNull: true,
         defaultValue: null
      },
      area_size: {
         type: DataTypes.INTEGER(10).UNSIGNED,
         allowNull: true,
         defaultValue: null
      },
      meta_value: {
         type: DataTypes.JSON,
         allowNull: true,
         defaultValue: null
      }
   }, {
      tableName: 'room',
      classMethods: {
         associate: function(models) {

            room.belongsTo(models.post, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               foreignKey: {
                  name: 'post_id',
                  allowNull: false
               },
               targetKey: "ID"
            });

            room.belongsTo(models.media, {
               onUpdate: "CASCADE",
               onDelete: "NO ACTION",      // media삭제시 trigger를 부여해서 다른 thumbnail 이미지로 교체하자
               foreignKey: {
                  name: 'thumbnail_media_id',
                  allowNull: false
               },
               targetKey: "ID",
               as: "ThumbImage"
            });

         }
      }
   });

   return room;
};

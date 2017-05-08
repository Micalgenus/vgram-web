/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
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
      date: {
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
      classMethods: {
         associate: function(models) {

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

            media.hasOne(models.room, {
               onUpdate: "CASCADE",
               onDelete: "RESTRICT",
               foreignKey: {
                  name: 'thumbnail_media_id',
                  allowNull: false
               },
               sourceKey: "ID",
               as: "ThumbImage"
            });

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

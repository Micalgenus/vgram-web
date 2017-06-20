/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
   var comment = sequelize.define('comment', {
      ID: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      post_id: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
         // primaryKey: true,    //
         references: {
            model: 'post',
            key: 'ID'
         }
      },
      user_id: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
         references: {
            model: 'user',
            key: 'ID'
         }
      },
      parent_comment_id: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: true,
         references: {
            model: 'comment',
            key: 'ID'
         },
         defaultValue: null
      },
      content: {
         type: DataTypes.TEXT,
         allowNull: true,
         defaultValue: null
      },
      like: {
         type: DataTypes.INTEGER(10).UNSIGNED,
         allowNull: true,
         defaultValue: '0'
      },
      createdAt: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW
      },
      updatedAt: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW
      }
   }, {
      tableName: 'comment',
      classMethods: {

         associate: function(models) {

            comment.belongsTo(models.post, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               foreignKey: {
                  name: 'post_id',
                  allowNull: false
               },
               targetKey: "ID"
            });

            comment.belongsTo(models.user, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               foreignKey: {
                  name: 'user_id',
                  allowNull: false
               },
               targetKey: "ID"
            });

            comment.hasMany(models.comment, {
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               foreignKey: {
                  name: 'parent_comment_id',
                  allowNull: true
               },
               sourceKey: "ID"
            });
         }
      },
      indexes: [
         // Create a unique index on ID, post_id, user_id
         {
            primaryKey: true,
            fields: ['ID', 'post_id', 'user_id']
         }
      ]
   });

   return comment;
};

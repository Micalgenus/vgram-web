/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_media_relationships', {
    post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
       primaryKey: true,
       references: {
        model: 'posts',
        key: 'ID'
      }
    },
    media_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
       primaryKey: true,
       references: {
        model: 'medias',
        key: 'ID'
      }
    }
  }, {
    tableName: 'post_media_relationships'
  });
};

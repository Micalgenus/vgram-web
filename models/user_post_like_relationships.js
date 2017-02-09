/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_post_like_relationships', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
       primaryKey: true,
       references: {
        model: 'users',
        key: 'ID'
      }
    },
    post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
       primaryKey: true,
       references: {
        model: 'posts',
        key: 'ID'
      }
    }
  }, {
    tableName: 'user_post_like_relationships'
  });
};

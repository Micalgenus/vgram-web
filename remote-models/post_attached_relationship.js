/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_attached_relationship', {
    post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'posts',
        key: 'ID'
      }
    },
    attached_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'attached',
        key: 'ID'
      }
    }
  }, {
    tableName: 'post_attached_relationship'
  });
};

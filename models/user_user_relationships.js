/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_user_relationships', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'ID'
      }
    },
    user_target_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
       primaryKey: true,
       references: {
        model: 'users',
        key: 'ID'
      }
    }
  }, {
    tableName: 'user_user_relationships'
  });
};

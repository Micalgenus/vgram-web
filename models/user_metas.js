/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_metas', {
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
        model: 'users',
        key: 'ID'
      }
    },
    meta_key: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    meta_value: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    tableName: 'user_metas'
  });
};

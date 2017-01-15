/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('consulting', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'posts',
        key: 'ID'
      }
    },
    consult_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'online'
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true
     },
     meta_value: {
        type: DataTypes.STRING,
        allowNull: true
     }
  }, {
    tableName: 'consulting'
  });
};

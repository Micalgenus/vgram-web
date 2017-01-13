/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medias', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    media_group: {
      type: DataTypes.STRING,
      allowNull: true
    },
    media_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    meta_value: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'medias'
  });
};

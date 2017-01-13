/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    member_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    registered_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    activation_key: {
      type: DataTypes.STRING,
      allowNull: true
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ko_KR'
    }
  }, {
    tableName: 'users'
  });
};

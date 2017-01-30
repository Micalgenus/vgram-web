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
    },
    profile_image_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
     meta_value: {
       type: DataTypes.String(511),
        allowNull: true,
        defaultValue: null
     }
  }, {
    tableName: 'users'
  });
};

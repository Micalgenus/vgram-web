/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'ID'
      }
    },
    post_init_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    post_init_date_gmt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    post_status: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      defaultValue: 'private'
    },
    post_modified_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    post_modified_date_gmt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    post_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    read_count: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },
    like: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },
    unlike: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ko_KR'
    },
     meta_value: {
        type: DataTypes.STRING,
        allowNull: true
     }
  }, {
    tableName: 'posts'
  });
};

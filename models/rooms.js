/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rooms', {
    ID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'ID'
      }
    },
    room_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    post_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    old_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null
    },
    old_address_dong: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null
    },
    coordinate: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    thumbnail_image_path: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    thumbnail_media_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      references: {
        model: 'medias',
        key: 'ID'
      }
    },
    deposit: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },
    monthly_rent_fee: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },
    area_size: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: null
    },
    meta_value: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  }, {
    tableName: 'rooms'
  });
};

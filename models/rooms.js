/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rooms', {
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
    room_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addr_post_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    old_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    old_address_dong: {
      type: DataTypes.STRING,
      allowNull: true
    },
    coordinate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail_file_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail_file_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail_media_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'medias',
        key: 'ID'
      }
    },
    deposit: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    monthly_rent_fee: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    area_size: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    meta_value: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'rooms'
  });
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const pumps = sequelize.define('pumps', {
    organization_id: DataTypes.INTEGER,
    country_name: DataTypes.STRING,
    province_name: DataTypes.STRING,
    commune_name: DataTypes.STRING,
    district_name: DataTypes.STRING,
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER
  }, {});
  pumps.associate = function(models) {
    // associations can be defined here
    accounts.hasMany(models.organization, {
      foreignkey: 'organization_id',
      as: 'organization',
      onDelete: 'CASCADE'
    })
  };
  return pumps;
};
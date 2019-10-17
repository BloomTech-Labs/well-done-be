'use strict';
module.exports = (sequelize, DataTypes) => {
  const sensor = sequelize.define('sensor', {
    pump_id: DataTypes.INTEGER,
    organization_id: DataTypes.INTEGER,
    historical_id: DataTypes.INTEGER,
    sensor_ID: DataTypes.INTEGER,
    kind: DataTypes.STRING,
    type: DataTypes.STRING,
    cellular: DataTypes.INTEGER,
    bluetooth: DataTypes.INTEGER,
    training: DataTypes.STRING,
    remark: DataTypes.STRING,
    data_finished: DataTypes.DATE,
    depth: DataTypes.INTEGER,
    yield: DataTypes.INTEGER,
    static: DataTypes.INTEGER,
    quality: DataTypes.STRING,
    level_dynamic: DataTypes.INTEGER
  }, {});
  sensor.associate = function(models) {
    // associations can be defined here
    accounts.hasMany(models.pumps, {
      foreignkey: 'pumps_id',
      as: 'pumps',
      onDelete: 'CASCADE'
    })
    accounts.hasMany(models.organization, {
      foreignkey: 'organization_id',
      as: 'organization',
      onDelete: 'CASCADE'
    })
    accounts.hasMany(models.historical, {
      foreignkey: 'historical_id',
      as: 'historical',
      onDelete: 'CASCADE'
    })
    accounts.hasMany(models.dates, {
      foreignkey: 'dates_id',
      as: 'dates',
      onDelete: 'CASCADE'
    })
  };
  return sensor;
};
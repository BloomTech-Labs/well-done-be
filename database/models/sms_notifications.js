'use strict';
module.exports = (sequelize, DataTypes) => {
  const sms_notifications = sequelize.define('sms_notifications', {
    mobile_number: DataTypes.STRING,
    pump_id: DataTypes.INTEGER,
    organization_id: DataTypes.INTEGER,
    sensor_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {});
  sms_notifications.associate = function(models) {
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
    accounts.hasMany(models.sensors, {
      foreignkey: 'sensors_id',
      as: 'sensors',
      onDelete: 'CASCADE'
    })
  };
  return sms_notifications;
};
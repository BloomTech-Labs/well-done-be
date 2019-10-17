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
  };
  return sms_notifications;
};
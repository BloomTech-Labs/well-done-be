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
  };
  return sensor;
};
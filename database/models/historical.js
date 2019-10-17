'use strict';
module.exports = (sequelize, DataTypes) => {
  const historical = sequelize.define('historical', {
    date: DataTypes.DATE,
    count: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {});
  historical.associate = function(models) {
    // associations can be defined here
  };
  return historical;
};
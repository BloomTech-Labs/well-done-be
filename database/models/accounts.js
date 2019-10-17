'use strict';
module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define('accounts', {
    account_types_id: DataTypes.INTEGER,
    organization_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email_address: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile_number: DataTypes.STRING
  }, {});
  accounts.associate = function(models) {
    // associations can be defined here
  };
  return accounts;
};
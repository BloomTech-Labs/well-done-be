'use strict';
module.exports = (sequelize, DataTypes) => {
  const account_types = sequelize.define('account_types', {
    super_user: DataTypes.STRING,
    org_user: DataTypes.STRING,
    org_admin: DataTypes.STRING
  }, {});
  account_types.associate = function(models) {
    // associations can be defined here
  };
  return account_types;
};
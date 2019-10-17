'use strict';
module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define('organization', {
    accounts_id: DataTypes.INTEGER,
    organization_name: DataTypes.STRING,
    headquarter_city: DataTypes.STRING
  }, {});
  organization.associate = function(models) {
    // associations can be defined here
    accounts.hasMany(models.accounts, {
      foreignkey: 'accounts_id',
      as: 'accounts',
      onDelete: 'CASCADE'
    })
  };
  return organization;
};
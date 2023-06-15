const sequelize = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define('RefreshToken', {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    idRefreshToken: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize .INTEGER
    },
    token: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    expires: {
        allowNull: false,
        type: Sequelize.DATE,
    },
    createdByIp: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    idUser: {
        type: Sequelize.INTEGER,
    },
    isExpired: {
      type: Sequelize.VIRTUAL,
      get() {
        return Date.now() >= this.getDataValue('expires')
      }
    },
    isActive: {
      type: Sequelize.VIRTUAL,
      get() {
        return !this.getDataValue('isExpired')
      }
    }
  });

  RefreshToken.associate = function(models) {
    RefreshToken.hasOne(models.User, {foreignKey: 'idUser', as: 'User'})
  };
  return RefreshToken;
};
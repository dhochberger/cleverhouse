const sequelize = require('sequelize')
const Sequelize = require('sequelize')
const User = require('./user')

module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define('Device', {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        idDevice: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
    })
    return Device
}

const sequelize = require('sequelize')
const Sequelize = require('sequelize')
const User = require('./user')

module.exports = (sequelize, DataTypes) => {
    const House = sequelize.define('House', {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        idHouse: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        nameHouse: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
    })
    return House
}

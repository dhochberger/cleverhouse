const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const HouseDevices = sequelize.define(
        'HouseDevices',
        {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            idHouseDevices: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            idDevice: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            idHouse: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
        },
        { freezeTableName: true }
    )
    HouseDevices.associate = function (models) {
        HouseDevices.hasMany(models.House, { foreignKey: 'idHouse', as: 'house' })
    }
    HouseDevices.associate = function (models) {
        HouseDevices.hasMany(models.Device, { foreignKey: 'idDevice', as: 'device' })
    }
    return HouseDevices
}

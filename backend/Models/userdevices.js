const sequelize = require('sequelize')
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const UserDevices = sequelize.define(
        'UserDevices',
        {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            idUserDevices: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            idUser: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            idDevice: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            rightToWrite: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
        },
        { freezeTableName: true }
    )
    UserDevices.associate = function (models) {
        UserDevices.hasMany(models.User, { foreignKey: 'idUser', as: 'user' })
    }
    UserDevices.associate = function (models) {
        UserDevices.hasMany(models.Device, { foreignKey: 'idDevice', as: 'device' })
    }
    return UserDevices
}

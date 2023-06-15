const sequelize = require('sequelize')
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const UserIsMain = sequelize.define(
        'UserIsMain',
        {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            idUserIsMain: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            idUser: {
                type: Sequelize.INTEGER,
            },
            idHouse: {
                type: Sequelize.INTEGER,
            },
            isMain: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        { freezeTableName: true }
    )
    UserIsMain.associate = function (models) {
        UserIsMain.hasMany(models.User, { foreignKey: 'idUser', as: 'user' })
    }
    UserIsMain.associate = function (models) {
        UserIsMain.hasMany(models.House, { foreignKey: 'idHouse', as: 'house' })
    }
    return UserIsMain
}

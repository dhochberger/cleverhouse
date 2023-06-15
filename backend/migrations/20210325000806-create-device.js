'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Devices', {
            idDevice: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
        await queryInterface.createTable('HouseDevices', {
            idHouseDevices: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            idDevice: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Devices', key: 'idDevice' },
            },
            idHouse: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Houses', key: 'idHouse' },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
        await queryInterface.createTable('UserDevices', {
            idUserDevices: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            idUser: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Users', key: 'idUser' },
            },
            idDevice: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Devices', key: 'idDevice' },
            },
            rightToWrite: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Devices')
        await queryInterface.dropTable('HouseDevices')
        await queryInterface.dropTable('UserDevices')
    },
}

'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            idUser: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
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
        await queryInterface.createTable('UserIsMain', {
            idUserIsMain: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            idUser: {
                type: Sequelize.INTEGER,
                references: { model: 'Users', key: 'idUser' },
            },
            idHouse: {
                type: Sequelize.INTEGER,
                references: { model: 'Houses', key: 'idHouse' },
            },
            isMain: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                default: false,
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
        await queryInterface.dropTable('Users')
        await queryInterface.dropTable('UserIsMain')
    },
}

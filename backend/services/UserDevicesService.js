const db = require('../database/database')
const { Op } = require('sequelize')

class UserDevicesService {
    static async getAllUserDevices() {
        try {
            return await db.UserDevices.findAll()
        } catch (error) {
            throw error
        }
    }

    static async getAllUserDevicesForMe(id) {
        try {
            return await db.UserDevices.findAll({ where: { idUser: id } })
        } catch (error) {
            throw error
        }
    }

    static async getUserDevices(id) {
        try {
            const userDevice = await db.UserDevices.findOne({
                where: { idUserDevices: id },
            })
            return userDevice
        } catch (error) {
            throw error
        }
    }

    static async addUserDevices(newUserDevices) {
        try {
            const userDevices_exists = await db.UserDevices.findOne({
                where: {
                    [Op.and]: [{ idUser: newUserDevices.idUser }, { idDevice: newUserDevices.idDevice }],
                },
            })
            if (userDevices_exists) return null
            return await db.UserDevices.create(newUserDevices)
        } catch (error) {
            throw error
        }
    }

    static async updateUserDevices(id, updateUserDevices) {
        try {
            const userDeviceToUpdate = await db.UserDevices.findOne({
                where: { idUserDevices: id },
            })

            if (userDeviceToUpdate) {
                await db.UserDevices.update(updateUserDevices, {
                    where: { idUserDevices: id },
                })

                return updateUserDevices
            }
            return null
        } catch (error) {
            throw error
        }
    }

    static async deleteUserDevices(id) {
        try {
            const userDeviceToDelete = await db.UserDevices.findOne({
                where: { idUserDevices: id },
            })

            if (userDeviceToDelete) {
                const deletedUserDevices = await db.UserDevices.destroy({
                    where: { idUserDevices: id },
                })
                return deletedUserDevices
            }
            return null
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserDevicesService

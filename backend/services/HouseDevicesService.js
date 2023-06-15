const db = require('../database/database')
const { Op } = require('sequelize')

class HouseDevicesService {
    static async getAllHouseDevices() {
        try {
            return await db.HouseDevices.findAll()
        } catch (error) {
            throw error
        }
    }

    static async getHouseDevices(id) {
        try {
            const house = await db.HouseDevices.findOne({
                where: { idHouseDevices: id },
            })
            return house
        } catch (error) {
            throw error
        }
    }

    static async addHouseDevices(newHouse) {
        try {
            const houseDevices_exists = await db.HouseDevices.findOne({
                where: {
                    [Op.and]: [{ idHouse: newHouse.idHouse }, { idDevice: newHouse.idDevice }],
                },
            })
            if (houseDevices_exists) return null
            return await db.HouseDevices.create(newHouse)
        } catch (error) {
            throw error
        }
    }

    static async updateHouseDevices(id, updateHouse) {
        try {
            const houseToUpdate = await db.HouseDevices.findOne({
                where: { idHouseDevices: id },
            })
            if (houseToUpdate) {
                await db.HouseDevices.update(updateHouse, {
                    where: { idHouseDevices: id },
                })
                return updateHouse
            }
            return null
        } catch (error) {
            throw error
        }
    }

    static async deleteHouseDevices(id) {
        try {
            const houseToDelete = await db.HouseDevices.findOne({
                where: { idHouseDevices: id },
            })

            if (houseToDelete) {
                const deletedHouse = await db.HouseDevices.destroy({
                    where: { idHouseDevices: id },
                })
                return deletedHouse
            }
            return null
        } catch (error) {
            throw error
        }
    }
}

module.exports = HouseDevicesService

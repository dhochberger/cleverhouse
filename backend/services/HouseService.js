const db = require('../database/database')

class HouseService {
    static async get_all_houses() {
        try {
            return await db.House.findAll()
        } catch (error) {
            throw error
        }
    }

    static async get_house(id) {
        try {
            const house = await db.House.findOne({
                where: { idHouse: id },
            })
            return house
        } catch (error) {
            throw error
        }
    }

    static async add_house(newHouse) {
        try {
            return await db.House.create(newHouse)
        } catch (error) {
            throw error
        }
    }

    static async update_house(id, updateHouse) {
        try {
            const houseToUpdate = await db.House.findOne({
                where: { idHouse: id },
            })

            if (houseToUpdate) {
                await db.House.update(updateHouse, {
                    where: { idHouse: id },
                })

                return updateHouse
            }
            return null
        } catch (error) {
            throw error
        }
    }

    static async delete_house(id) {
        try {
            const houseToDelete = await db.House.findOne({
                where: { idHouse: id },
            })

            if (houseToDelete) {
                const deletedHouse = await db.House.destroy({
                    where: { idHouse: id },
                })
                return deletedHouse
            }
            return null
        } catch (error) {
            throw error
        }
    }
}

module.exports = HouseService

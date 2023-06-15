const db = require('../database/database')
const { Op } = require('sequelize')

class UserIsMainService {
    static async get_all_user_is_main(id) {
        try {
            return await db.UserIsMain.findAll({ where: { idUser: id } })
        } catch (error) {
            throw error
        }
    }

    static async get_user_is_main(id, idUser) {
        try {
            const user_is_main = await db.UserIsMain.findOne({
                where: {
                    [Op.and]: [{ idUser: idUser }, { idUserIsMain: id }],
                },
            })
            return user_is_main
        } catch (error) {
            throw error
        }
    }

    static async add_user_is_main(newUserIsMain) {
        try {
            const isMain_exists = await db.UserIsMain.findOne({
                where: {
                    [Op.and]: [{ idUser: newUserIsMain.idUser }, { idHouse: newUserIsMain.idHouse }],
                },
            })
            if (isMain_exists) return null
            return await db.UserIsMain.create(newUserIsMain)
        } catch (error) {
            throw error
        }
    }

    static async update_user_is_main(id, updateUserIsMain) {
        try {
            const userMainToUpdate = await db.UserIsMain.findOne({
                where: { idUserIsMain: id },
            })

            if (userMainToUpdate) {
                const updateHouse = await db.UserIsMain.update(updateUserIsMain, {
                    returning: true,
                    where: { idUserIsMain: id },
                })
                if (updateHouse[0] !== 0) return updateHouse[1][0].dataValues

                return updateHouse
            }
            return null
        } catch (error) {
            throw error
        }
    }

    static async delete_user_is_main(id) {
        try {
            const userIsMainToDelete = await db.UserIsMain.findOne({
                where: { idUserIsMain: id },
            })

            if (userIsMainToDelete) {
                const deletedHouse = await db.UserIsMain.destroy({
                    where: { idUserIsMain: id },
                })
                return deletedHouse
            }
            return null
        } catch (error) {
            throw error
        }
    }

    static async get_house_user_is_main(idHouse, idUser) {
        try {
            const found = db.UserIsMain.findOne({
                where: { [Op.and]: [{ idHouse: idHouse }, { idUser: idUser }, { isMain: true }] },
            })
            if (found) return await db.UserIsMain.findAll({ where: { idHouse: idHouse } })
            return null
        } catch (error) {
            throw error
        }
    }

    static async get_all_user_is_main_for_me(id) {
        try {
            return await db.UserIsMain.findAll({ where: { idUser: id } })
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserIsMainService

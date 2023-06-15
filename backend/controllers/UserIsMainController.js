const UserIsMainService = require('../services/UserIsMainService')
const Util = require('../utils/Utils')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const util = new Util()

class UserIsMainController {
    static async get_all_user_is_main(req, res) {
        const user = req.user
        try {
            const user_is_main = await UserIsMainService.get_all_user_is_main(user.idUser)
            if (user_is_main.length > 0) {
                util.setSuccess(200, 'UserIsMain retrieved', user_is_main)
            } else {
                util.setError(404, 'No UserIsMain found')
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async get_user_is_main(req, res) {
        const { id } = req.params
        const user = req.user

        try {
            const user_is_main = await UserIsMainService.get_user_is_main(id, user.idUser)

            if (!user_is_main) {
                util.setError(404, `Cannot find user_is_main with the id ${id}`)
            } else {
                util.setSuccess(200, 'Found user_is_main', user_is_main)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async add_user_is_main(req, res) {
        const newUserIsMain = req.body

        if (!newUserIsMain.idHouse || !newUserIsMain.idUser) {
            util.setError(400, `Please provide complete informations`)
            return util.send(res)
        }

        try {
            const createdUserIsMain = await UserIsMainService.add_user_is_main(newUserIsMain)
            if (!createdUserIsMain) {
                util.setError(405, 'UserIsMain already exists!', createdUserIsMain)
            } else util.setSuccess(201, 'UserIsMain Added!', createdUserIsMain)
            return util.send(res)
        } catch (error) {
            util.setError(500, `Cannot add user_is_main ${newUserIsMain.idHouse}, ${newUserIsMain.idUser}`)
            return util.send(res)
        }
    }

    static async update_user_is_main(req, res) {
        const alteredUserIsMain = req.body
        const { id } = req.params

        try {
            const updateUserIsMain = await UserIsMainService.update_user_is_main(id, alteredUserIsMain)
            if (!updateUserIsMain) {
                util.setError(404, `Cannot find user_is_main with the id: ${id}`)
            } else {
                util.setSuccess(200, 'UserIsMain updated', updateUserIsMain)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async delete_user_is_main(req, res) {
        const { id } = req.params

        try {
            const userIsMainToDelete = await UserIsMainService.delete_user_is_main(id)
            if (userIsMainToDelete) {
                util.setSuccess(200, `UserIsMain deleted ${id}`)
            } else {
                util.setError(404, `UserIsMain with the id ${id} cannot be found`)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async get_all_user_is_main_for_me(req, res) {
        const user = req.user

        try {
            const usertoGet = await UserIsMainService.get_all_user_is_main_for_me(user.dataValues.idUser)
            if (usertoGet.length > 0) {
                util.setSuccess(200, `Houses where user ${user.dataValues.idUser} is in found`, usertoGet)
            } else {
                util.setError(404, `UserIsMain cannot be found`)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async get_house_user_is_main(req, res) {
        const user = req.user
        const { id } = req.params
        try {
            const userIsMainHouse = await UserIsMainService.get_house_user_is_main(id, user.idUser)
            if (userIsMainHouse.length > 0) {
                util.setSuccess(200, `UserIsMain found ${id}`, userIsMainHouse)
            } else {
                util.setError(404, `UserIsMain with the id ${id} cannot be found`)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }
}

module.exports = UserIsMainController

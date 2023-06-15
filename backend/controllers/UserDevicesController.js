const UserDevicesService = require('../services/UserDevicesService')
const Util = require('../utils/Utils')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const util = new Util()

class UserDevicesController {
    static async getAllUserDevices(req, res) {
        try {
            const userDevices = await UserDevicesService.getAllUserDevices()
            if (userDevices.length > 0) {
                util.setSuccess(200, 'UserDevicess retrieved', userDevices)
            } else {
                util.setError(404, 'No userDevice found')
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async getAllUserDevicesForMe(req, res) {
        const user = req.user
        try {
            const userDevices = await UserDevicesService.getAllUserDevicesForMe(user.idUser)
            if (userDevices.length > 0) {
                util.setSuccess(200, 'UserDevicess retrieved', userDevices)
            } else {
                util.setError(404, 'No userDevice found')
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async getUserDevices(req, res) {
        const { id } = req.params

        try {
            const userDevice = await UserDevicesService.getUserDevices(id)

            if (!userDevice) {
                util.setError(404, `Cannot find userDevice with the id ${id}`)
            } else {
                util.setSuccess(200, 'Found userDevice', userDevice)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async addUserDevices(req, res) {
        const newUserDevices = req.body

        if (!newUserDevices.idDevice || !newUserDevices.idUser) {
            util.setError(400, `Please provide complete informations`)
            return util.send(res)
        }

        try {
            const createdUserDevices = await UserDevicesService.addUserDevices(newUserDevices)

            if (!createdUserDevices) {
                util.setError(405, 'UserDevices already exists!')
            } else util.setSuccess(201, 'UserDevices Added!', createdUserDevices)
            return util.send(res)
        } catch (error) {
            util.setError(500, `Cannot add userDevice ${newUserDevices}`)
            return util.send(res)
        }
    }

    static async updateUserDevices(req, res) {
        const alteredUserDevices = req.body
        const { id } = req.params

        try {
            const updateUserDevices = await UserDevicesService.updateUserDevices(id, alteredUserDevices)
            if (!updateUserDevices) {
                util.setError(404, `Cannot find userDevice with the id: ${id}`)
            } else {
                util.setSuccess(200, 'UserDevices updated', updateUserDevices)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async deleteUserDevices(req, res) {
        const { id } = req.params

        try {
            const userDeviceToDelete = await UserDevicesService.deleteUserDevices(id)
            if (userDeviceToDelete) {
                util.setSuccess(200, `UserDevices deleted ${id}`)
            } else {
                util.setError(404, `UserDevices with the id ${id} cannot be found`)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }
}

module.exports = UserDevicesController

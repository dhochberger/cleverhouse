const DeviceService = require('../services/DeviceService')
const Util = require('../utils/Utils')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const util = new Util()

class DeviceController {
    static async get_all_devices(req, res) {
        try {
            const devices = await DeviceService.get_all_devices()
            if (devices.length > 0) {
                util.setSuccess(200, 'Devices retrieved', devices)
            } else {
                util.setError(404, 'No device found')
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async get_device(req, res) {
        const { id } = req.params

        try {
            const device = await DeviceService.get_device(id)

            if (!device) {
                util.setError(404, `Cannot find device with the id ${id}`)
            } else {
                util.setSuccess(200, 'Found device', device)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async add_device(req, res) {
        const { idDevice } = req.body

        if (!idDevice) {
            util.setError(400, `Please provide an idDevice`)
            return util.send(res)
        }

        try {
            const newDevice = await DeviceService.add_device({ idDevice: idDevice })
            util.setSuccess(201, `Device ${idDevice} Added!`, newDevice)
            return util.send(res)
        } catch (error) {
            util.setError(403, `${idDevice} already exists`)
            return util.send(res)
        }
    }

    static async delete_device(req, res) {
        const { id } = req.params

        try {
            const deviceToDelete = await DeviceService.delete_device(id)
            if (deviceToDelete) {
                util.setSuccess(200, `Device deleted ${id}`)
            } else {
                util.setError(404, `Device with the id ${id} cannot be found`)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }
}

module.exports = DeviceController

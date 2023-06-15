const db = require('../database/database')

class DeviceService {
    static async get_all_devices() {
        try {
            return await db.Device.findAll()
        } catch (error) {
            throw error
        }
    }

    static async get_device(id) {
        try {
            const device = await db.Device.findOne({
                where: { idDevice: id },
            })
            return device
        } catch (error) {
            throw error
        }
    }

    static async add_device(idDevice) {
        try {
            return await db.Device.create(idDevice)
        } catch (error) {
            throw error
        }
    }

    static async update_device(id, update_device) {
        try {
            const deviceToUpdate = await db.Device.findOne({
                where: { idDevice: id },
            })

            if (deviceToUpdate) {
                await db.Device.update(update_device, {
                    where: { idDevice: id },
                })

                return update_device
            }
            return null
        } catch (error) {
            throw error
        }
    }

    static async delete_device(id) {
        try {
            const deviceToDelete = await db.Device.findOne({
                where: { idDevice: id },
            })

            if (deviceToDelete) {
                const deletedDevice = await db.Device.destroy({
                    where: { idDevice: id },
                })
                return deletedDevice
            }
            return null
        } catch (error) {
            throw error
        }
    }
}

module.exports = DeviceService

const HouseDevicesService = require('../services/HouseDevicesService')
const Util = require('../utils/Utils')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const util = new Util()

class HouseDevicesController {
    static async getAllHouseDevices(req, res) {
        try {
            const houses = await HouseDevicesService.getAllHouseDevices()
            if (houses.length > 0) {
                util.setSuccess(200, 'Houses retrieved', houses)
            } else {
                util.setError(404, 'No house found')
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async getHouseDevices(req, res) {
        const { id } = req.params

        try {
            const house = await HouseDevicesService.getHouseDevices(id)

            if (!house) {
                util.setError(404, `Cannot find house with the id ${id}`)
            } else {
                util.setSuccess(200, 'Found house', house)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async addHouseDevices(req, res) {
        const nameHouse = req.body

        if (!nameHouse.idDevice || !nameHouse.idHouse) {
            util.setError(400, `Please provide complete informations`)
            return util.send(res)
        }

        try {
            const createdHouse = await HouseDevicesService.addHouseDevices(nameHouse)
            if (!createdHouse) {
                util.setError(405, 'HousesDevices already exists!')
            } else util.setSuccess(201, 'HousesDevices Added!', createdHouse)
            return util.send(res)
        } catch (error) {
            util.setError(500, `Cannot add houseDevices ${nameHouse}`)
            return util.send(res)
        }
    }

    static async updateHouseDevices(req, res) {
        const alteredHouse = req.body
        const { id } = req.params

        try {
            const updateHouse = await HouseDevicesService.updateHouseDevices(id, alteredHouse)
            if (!updateHouse) {
                util.setError(404, `Cannot find house with the id: ${id}`)
            } else {
                util.setSuccess(200, 'House updated', updateHouse)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async deleteHouseDevices(req, res) {
        const { id } = req.params

        try {
            const houseToDelete = await HouseDevicesService.deleteHouseDevices(id)
            if (houseToDelete) {
                util.setSuccess(200, `House deleted ${id}`)
            } else {
                util.setError(404, `House with the id ${id} cannot be found`)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }
}

module.exports = HouseDevicesController

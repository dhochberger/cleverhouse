const HouseService = require('../services/HouseService')
const Util = require('../utils/Utils')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const util = new Util()

class HouseController {
    static async get_all_houses(req, res) {
        try {
            const houses = await HouseService.get_all_houses()
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

    static async get_house(req, res) {
        const { id } = req.params

        try {
            const house = await HouseService.get_house(id)

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

    static async add_house(req, res) {
        const { nameHouse } = req.body

        if (!nameHouse) {
            util.setError(400, `Please provide a nameHouse`)
            return util.send(res)
        }

        try {
            const createdHouse = await HouseService.add_house({ nameHouse: nameHouse })
            util.setSuccess(201, 'House Added!', createdHouse)
            return util.send(res)
        } catch (error) {
            util.setError(500, `Cannot add house ${nameHouse}`)
            return util.send(res)
        }
    }

    static async update_house(req, res) {
        const alteredHouse = req.body
        const { id } = req.params

        try {
            const updateHouse = await HouseService.update_house(id, alteredHouse)
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

    static async delete_house(req, res) {
        const { id } = req.params

        try {
            const houseToDelete = await HouseService.delete_house(id)
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

module.exports = HouseController

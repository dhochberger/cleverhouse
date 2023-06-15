const UserService = require('../services/UserService')
const Util = require('../utils/Utils')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const util = new Util()

class UserController {
    static async get_all_users(req, res) {
        try {
            const users = await UserService.get_all_users()
            if (users.length > 0) {
                for (const user of users) {
                    delete user.dataValues.password
                }
                util.setSuccess(200, 'Users retrieved', users)
            } else {
                util.setError(404, 'No user found')
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, 'No user found')
            return util.send(res)
        }
    }

    static async get_user(req, res) {
        const { id } = req.params

        try {
            const user = await UserService.get_user(id)

            if (!user) {
                util.setError(404, `Cannot find user with the id ${id}`)
            } else {
                delete user.dataValues.password
                util.setSuccess(200, 'Found user', user)
            }
            return util.send(res)
        } catch (error) {
            util.send(res)
            return util.send(res)
        }
    }

    static async get_self(req, res) {
        const user = req.user
        delete user.dataValues.password

        util.setSuccess(200, 'User', user)
        return util.send(res)
    }

    static async update_self(req, res) {
        const user = req.user
        const alteredUser = req.body

        if (alteredUser.password) {
            //Hash password
            var hashPassword = async function () {
                var hashPwd = await bcrypt.hash(alteredUser.password, 10)
                return hashPwd
            }
            let pwd = await hashPassword()
            alteredUser.password = pwd
        }

        try {
            const updateUser = await UserService.update_self(user.dataValues.idUser, alteredUser)

            if (!updateUser) {
                util.setError(400, `${user.dataValues.username} couldn't be updated`)
            } else {
                util.setSuccess(200, `User updated ${updateUser.username}`, updateUser)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, error)
            return util.send(res)
        }
    }

    static async delete_self(req, res) {
        const user = req.user

        try {
            const userFound = await UserService.delete_self(user.dataValues.idUser)
            if (userFound) {
                util.setSuccess(200, `User deleted ${user.dataValues.idUser}`)
            } else {
                util.setError(404, `User with the id ${user.dataValues.idUser} cannot be found`)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, error)
            return util.send(res)
        }
    }

    static async register(req, res) {
        const newUser = req.body

        if (!newUser.email || !newUser.username || !newUser.password) {
            util.setError(400, 'Please provide complete details')
            return util.send(res)
        }

        if (!String(newUser.username)) {
            util.setError(400, 'Please provide a string value for username')
            return util.send(res)
        }
        if (!String(newUser.email)) {
            util.setError(400, 'Please provide a string value for email')
            return util.send(res)
        }

        //Hash password
        var hashPassword = async function () {
            var hashPwd = await bcrypt.hash(newUser.password, 10)
            return hashPwd
        }
        let pwd = await hashPassword()

        newUser.password = pwd

        try {
            const userExists = await UserService.register(newUser)

            if (!userExists.isNewRecord) {
                if (userExists.username === newUser.username) util.setError(409, 'Username already taken')
                else if (userExists.email === newUser.email) util.setError(409, 'Email already taken')
            } else {
                delete userExists.password
                util.setSuccess(200, `User ${userExists.username} created`, userExists)
            }
            return util.send(res)
        } catch (error) {
            util.send(error)
            return util.send(res)
        }
    }

    static async login(req, res) {
        const loginUser = req.body

        if (!loginUser.login) {
            util.setError(400, `Login needs to be provided`)
            return util.send(res)
        }
        if (!loginUser.password) {
            util.setError(400, `Password needs to be provided`)
            return util.send(res)
        }

        try {
            const userIp = req.header('x-forwarded-for') || req.connection.remoteAddress

            const userToLogin = await UserService.login(loginUser, userIp)

            if (userToLogin === 'login') {
                util.setError(404, `User ${loginUser.login} couldn't be found`)
                return util.send(res)
            } else if (userToLogin === 'password') {
                util.setError(403, `Password doesn't match`)
                return util.send(res)
            }

            if (userToLogin) {
                util.setSuccess(200, `User connected ${loginUser.login}`, userToLogin)
            } else {
                util.setError(404, `User ${loginUser.login} couldn't be found`)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, `Internal error`)
            return util.send(res)
        }
    }

    static async refresh_token(req, res) {
        const user = req.user
        const { refreshToken } = req.body
        const ipAdress = req.ip

        if (!refreshToken) {
            util.setError(401, `No refresh token provided`)
            return util.send(res)
        }
        const data = await UserService.refresh_token(user.dataValues, refreshToken, ipAdress)

        if (!data) {
            util.setError(401, `Invalid refresh token`)
            return util.send(res)
        }

        util.setSuccess(201, `Token refreshed`, data)
        return util.send(res)
    }

    static async disconnect(req, res) {
        try {
            const userToDelete = await UserService.disconnect(req.user.id)
            if (userToDelete) {
                util.setSuccess(200, `User ${req.user.username} logged out`)
            } else {
                util.setError(401, `User ${req.user.username} couldn't be logged out`)
            }
            return util.send(res)
        } catch (error) {
            util.setError(500, 'Internal error')
            return util.send(res)
        }
    }
}

module.exports = UserController

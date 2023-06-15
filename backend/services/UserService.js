const db = require('../database/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { variables } = require('../config/passport.js')
const { Op } = require('sequelize')
const crypto = require('crypto')
const { disconnect } = require('../controllers/UserController')

class UserService {
    static async get_all_users() {
        try {
            return await db.User.findAll()
        } catch (error) {
            throw error
        }
    }

    static async get_user(id) {
        try {
            const user = await db.User.findOne({
                where: { idUser: id },
            })
            return user
        } catch (error) {
            throw error
        }
    }

    static async update_self(id, updateUser) {
        try {
            const userToUpdate = await db.User.findOne({
                where: { idUser: id },
            })

            if (userToUpdate) {
                const updatedUser = await db.User.update(updateUser, { returning: true, where: { idUser: id } })

                if (updatedUser[0] !== 0) return updatedUser[1][0].dataValues
            }
            return null
        } catch (error) {
            throw error
        }
    }

    static async delete_self(id) {
        try {
            const userToDelete = await db.User.findOne({
                where: { idUser: id },
            })

            if (userToDelete) {
                const deletedUser = await db.User.destroy({
                    where: { idUser: id },
                })
                await this.disconnect(id)
                return deletedUser
            }
            return null
        } catch (error) {
            throw error
        }
    }

    static async register(newUser) {
        try {
            const userToRegister = await db.User.findOne({
                where: {
                    [Op.or]: [{ username: newUser.username }, { email: newUser.email }],
                },
            })

            if (userToRegister) {
                return { ...userToRegister.dataValues, isNewRecord: userToRegister._options.isNewRecord }
            } else {
                const createdUser = await db.User.create(newUser)
                return { ...createdUser.dataValues, isNewRecord: createdUser._options.isNewRecord }
            }
        } catch (error) {
            throw error
        }
    }

    static async login(userLogin, ipAdress) {
        try {
            const userToLogin = await db.User.findOne({
                where: {
                    [Op.or]: [{ username: userLogin.login }, { email: userLogin.login }],
                },
            })

            if (!userToLogin) {
                return 'login'
            } else if (!bcrypt.compareSync(userLogin.password, userToLogin.dataValues.password)) {
                return 'password'
            }

            const refreshToken = await create_or_update_refresh_token(userToLogin.dataValues, ipAdress)

            const jwtToken = generate_jwt_token(userToLogin)

            userToLogin.password = undefined
            return { user: userToLogin, jwtToken, refreshToken: refreshToken.token }
        } catch (error) {
            throw error
        }
    }

    static async refresh_token(user, token, ipAdress) {
        const refreshToken = await db.RefreshToken.findOne({
            where: {
                [Op.and]: [{ idUser: user.idUser }, { token: token }],
            },
        })

        if (!refreshToken || !refreshToken.isActive) return null
        else return generate_jwt_token(user)
    }

    static async disconnect(idUser) {
        try {
            const disconnected = await db.RefreshToken.findOne({ where: { idUser: idUser } })
            if (disconnected) await db.RefreshToken.destroy({ where: { idUser: idUser } })

            return disconnected
        } catch (error) {
            throw error
        }
    }
}

function generate_jwt_token(user) {
    return jwt.sign({ sub: user.idUser, id: user.idUser }, variables.secretOrKey, {
        expiresIn: '1h',
    })
}

async function create_or_update_refresh_token(user, ipAddress) {
    return await db.RefreshToken.findOne({ where: { idUser: user.idUser } })
        .then(async () => {
            return await db.RefreshToken.create({
                idUser: user.idUser,
                token: crypto.randomBytes(40).toString('hex'),
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                createdByIp: ipAddress,
            })
        })
        .catch(async error => {
            await db.RefreshToken.create({
                idUser: user.idUser,
                token: crypto.randomBytes(40).toString('hex'),
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                createdByIp: ipAddress,
            })
        })
}

/*
{
            user: user._id,
            token: crypto.randomBytes(40).toString('hex'),
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            createdByIp: ipAddress,
        },

static async addUser(newUser) {

        try {
            const userToRegister = await db.User.findOne({
                where: {username: String(newUser.username)}
            })

            if (userToRegister){
                return null
            }
            else return await db.User.create(newUser)
        } catch (error) {
            throw error;
        }
    }
        */
module.exports = UserService

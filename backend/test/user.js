//During the test the env variable is set to test
require('dotenv').config()
process.env.NODE_ENV = 'test'

let server = require('../app')

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

chai.use(chaiHttp)

const db = require('../database/database')
db.sequelize.options.logging = false

const user_body = {
    username: 'testCreate',
    email: 'testCreate@clvrhouse.com',
    password: 'testPwd',
}

const API_URL = '/users'

//Our parent block
describe('Users', () => {
    before(async () => {
        await db.User.destroy({ truncate: { cascade: true } })
        await db.RefreshToken.destroy({ truncate: { cascade: true } })
    })
    beforeEach(async () => {
        await db.User.destroy({ truncate: { cascade: true } })
        await db.RefreshToken.destroy({ truncate: { cascade: true } })
    })
    after(async () => {
        await db.User.destroy({ truncate: { cascade: true } })
        await db.RefreshToken.destroy({ truncate: { cascade: true } })
    })
    /*
    Register route test
    */
    describe('/register', () => {
        it('it should NOT REGISTER if no email provided', done => {
            user_body.email = ''
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')
                    ;(user_body.email = 'testCreate@clvrhouse.com'), done()
                })
        })
        it('it should NOT REGISTER if no username provided', done => {
            user_body.username = ''
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')

                    user_body.username = 'testCreate'
                    done()
                })
        })
        it('it should NOT REGISTER if no password provided', done => {
            user_body.password = ''
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')

                    user_body.password = 'testPwd'
                    done()
                })
        })
        it('it should NOT REGISTER if username already taken', done => {
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    res.should.have.status(200)

                    const user_body_2 = {
                        username: 'testCreate',
                        email: 'differentEmail@clvrhouse.com',
                        password: 'testPwd',
                    }

                    chai.request(server)
                        .post(`${API_URL}/register`)
                        .send(user_body_2)
                        .end((err, res) => {
                            res.should.have.status(409)
                            res.body.should.have.property('status').eql('error')
                            res.body.should.have.property('message').eql('Username already taken')

                            done()
                        })
                })
        })
        it('it should NOT REGISTER if email already taken', done => {
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    res.should.have.status(200)

                    const user_body_2 = {
                        username: 'differentUsername',
                        email: 'testCreate@clvrhouse.com',
                        password: 'testPwd',
                    }

                    chai.request(server)
                        .post(`${API_URL}/register`)
                        .send(user_body_2)
                        .end((err, res) => {
                            res.should.have.status(409)
                            res.body.should.have.property('status').eql('error')
                            res.body.should.have.property('message').eql('Email already taken')

                            done()
                        })
                })
        })
        it('it should REGISTER if datas provided', done => {
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('data').that.is.an('object')
                    res.body.should.have.property('status').eql('success')

                    done()
                })
        })
    })

    describe('/login', () => {
        it('it should NOT LOGIN if no login provided', done => {
            chai.request(server)
                .post(`${API_URL}/login`)
                .send({ password: 'test' })
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')
                    res.body.should.have.property('message').eql('Login needs to be provided')

                    done()
                })
        })
        it('it should NOT LOGIN if no password provided', done => {
            const user_body_2 = {
                login: 'testCreate',
            }
            chai.request(server)
                .post(`${API_URL}/login`)
                .send(user_body_2)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')
                    res.body.should.have.property('message').eql('Password needs to be provided')

                    done()
                })
        })
        it('it should NOT LOGIN if password wrong', done => {
            const user_body_2 = {
                login: 'testCreate',
                password: 'wrong',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            res.should.have.status(403)
                            res.body.should.have.property('status').eql('error')
                            res.body.should.have.property('message').eql("Password doesn't match")

                            done()
                        })
                })
        })
        it('it should NOT LOGIN if username wrong', done => {
            const user_body_2 = {
                login: 'test',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            res.should.have.status(404)
                            res.body.should.have.property('status').eql('error')
                            res.body.should.have.property('message').eql(`User ${user_body_2.login} couldn't be found`)

                            done()
                        })
                })
        })
        it('it should LOGIN user with username', done => {
            const user_body_2 = {
                login: 'testCreate',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.have.property('status').eql('success')
                            res.body.data.should.have.property('user').that.is.an('object')
                            res.body.data.should.have.property('jwtToken')

                            done()
                        })
                })
        })
        it('it should LOGIN user with email', done => {
            const user_body_2 = {
                login: 'testCreate@clvrhouse.com',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.have.property('status').eql('success')
                            res.body.data.should.have.property('user').that.is.an('object')
                            res.body.data.should.have.property('jwtToken')

                            done()
                        })
                })
        })
    })

    describe('/refreshtoken', () => {
        it('it should NOT REFRESH token if refresh not provided', done => {
            const user_body_2 = {
                login: 'testCreate',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            const token = res.body.data.jwtToken

                            chai.request(server)
                                .post(`${API_URL}/refreshtoken`)
                                .set('Authorization', 'Bearer ' + token)
                                .end((err, res) => {
                                    res.should.have.status(401)
                                    res.body.should.have.property('status').eql('error')

                                    done()
                                })
                        })
                })
        })
        it('it should NOT REFRESH token if token not provided', done => {
            const user_body_2 = {
                login: 'testCreate',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            const refreshToken = res.body.data.refreshToken

                            chai.request(server)
                                .post(`${API_URL}/refreshtoken`)
                                .send({ refreshToken: refreshToken })
                                .end((err, res) => {
                                    res.should.have.status(401)
                                    res.body.should.have.property('status').eql('error')

                                    done()
                                })
                        })
                })
        })
        it('it should REFRESH token', done => {
            const user_body_2 = {
                login: 'testCreate',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            const refreshToken = res.body.data.refreshToken
                            const token = res.body.data.jwtToken

                            chai.request(server)
                                .post(`${API_URL}/refreshtoken`)
                                .set('Authorization', 'Bearer ' + token)
                                .send({ refreshToken: refreshToken })
                                .end((err, res) => {
                                    res.should.have.status(201)
                                    res.body.should.have.property('data').that.is.a('string')
                                    res.body.should.have.property('status').eql('success')

                                    done()
                                })
                        })
                })
        })
    })

    describe('GET /', () => {
        it('it should GET users', done => {
            const user_body_2 = {
                login: 'testCreate',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            const token = res.body.data.jwtToken

                            chai.request(server)
                                .get(`${API_URL}/`)
                                .set('Authorization', 'Bearer ' + token)
                                .end((err, res) => {
                                    res.should.have.status(200)
                                    res.body.should.have.property('status').eql('success')
                                    res.body.should.have.property('data').that.is.an('array')
                                    done()
                                })
                        })
                })
        })
    })

    describe('GET /:id', () => {
        it('it should NOT GET users', done => {
            const user_body_2 = {
                login: 'testCreate',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            const token = res.body.data.jwtToken

                            chai.request(server)
                                .get(`${API_URL}/123123`)
                                .set('Authorization', 'Bearer ' + token)
                                .end((err, res) => {
                                    res.should.have.status(404)
                                    res.body.should.have.property('status').eql('error')
                                    done()
                                })
                        })
                })
        })
        it('it should GET users', done => {
            const user_body_2 = {
                login: 'testCreate',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            const token = res.body.data.jwtToken

                            const id = res.body.data.user.idUser

                            chai.request(server)
                                .get(`${API_URL}/${id}`)
                                .set('Authorization', 'Bearer ' + token)
                                .end((err, res) => {
                                    res.should.have.status(200)
                                    res.body.should.have.property('status').eql('success')
                                    res.body.should.have.property('data').that.is.an('object')
                                    done()
                                })
                        })
                })
        })
    })

    describe('GET /me', () => {
        it('it should GET me user', done => {
            const user_body_2 = {
                login: 'testCreate',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            const token = res.body.data.jwtToken

                            chai.request(server)
                                .get(`${API_URL}/me`)
                                .set('Authorization', 'Bearer ' + token)
                                .end((err, res) => {
                                    res.should.have.status(200)
                                    res.body.should.have.property('status').eql('success')
                                    res.body.should.have.property('data').that.is.an('object')
                                    res.body.data.should.have.property('username').eql(user_body.username)
                                    res.body.data.should.have.property('email').eql(user_body.email)
                                    done()
                                })
                        })
                })
        })
    })

    describe('DELETE /me', () => {
        it('it should DELETE me user', done => {
            const user_body_2 = {
                login: 'testCreate',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            const token = res.body.data.jwtToken

                            chai.request(server)
                                .delete(`${API_URL}/me`)
                                .set('Authorization', 'Bearer ' + token)
                                .end((err, res) => {
                                    res.should.have.status(200)
                                    res.body.should.have.property('status').eql('success')
                                    done()
                                })
                        })
                })
        })
        it('it should GET users', done => {
            const user_body_2 = {
                login: 'testCreate',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            const token = res.body.data.jwtToken

                            const id = res.body.data.user.idUser

                            chai.request(server)
                                .get(`${API_URL}/${id}`)
                                .set('Authorization', 'Bearer ' + token)
                                .end((err, res) => {
                                    res.should.have.status(200)
                                    res.body.should.have.property('status').eql('success')
                                    res.body.should.have.property('data').that.is.an('object')
                                    done()
                                })
                        })
                })
        })
    })

    describe('UPDATE /me', () => {
        it('it should NOT UPDATE me user if no body provided', done => {
            const user_body_2 = {
                login: 'testCreate',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            const token = res.body.data.jwtToken

                            chai.request(server)
                                .put(`${API_URL}/me`)
                                .set('Authorization', 'Bearer ' + token)
                                .end((err, res) => {
                                    res.should.have.status(400)
                                    res.body.should.have.property('status').eql('error')
                                    done()
                                })
                        })
                })
        })
        it('it should UPDATE me user if body provided', done => {
            const user_body_2 = {
                login: 'testCreate',
                password: 'testPwd',
            }
            chai.request(server)
                .post(`${API_URL}/register`)
                .send(user_body)
                .end((err, res) => {
                    chai.request(server)
                        .post(`${API_URL}/login`)
                        .send(user_body_2)
                        .end((err, res) => {
                            const token = res.body.data.jwtToken

                            chai.request(server)
                                .put(`${API_URL}/me`)
                                .set('Authorization', 'Bearer ' + token)
                                .send({ email: 'updatedMail@cleverhouse.com' })
                                .end((err, res) => {
                                    res.should.have.status(200)
                                    res.body.should.have.property('status').eql('success')
                                    res.body.should.have.property('data').that.is.an('object')
                                    res.body.data.should.have.property('email').eql('updatedMail@cleverhouse.com')
                                    done()
                                })
                        })
                })
        })
    })

    /*
     * Test the /POST route
     */
    /*describe('/REGISTER user', () => {
        it('it should NOT REGISTER a user without username field', (done) => {
            let user = {
                password: 'testpwd',
                email: 'test@test.com',
            };
            chai.request(server)
                .post(`${process.env.API_URL}/register`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('error');
                    done();
                });
        });
    });*/
})

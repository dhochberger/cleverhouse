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

const API_URL = '/userIsMain'

const user_is_main_body = {
    idHouse: '0',
    idUser: '0',
}
const jwtToken = {
    jwtToken: '',
}
//Our parent block
describe('UserIsMain', () => {
    before(async () => {
        await db.UserIsMain.destroy({ where: {}, truncate: { cascade: true } })
        await db.User.destroy({ where: {}, truncate: { cascade: true } })
        await db.House.destroy({ where: {}, truncate: { cascade: true } })
        const user_body = {
            username: 'testCreate',
            email: 'testCreate@clvruser_is_main.com',
            password: 'testPwd',
        }
        const house_body = {
            nameHouse: 'testHouse',
        }
        const user_body_2 = {
            login: 'testCreate',
            password: 'testPwd',
        }
        await chai
            .request(server)
            .post(`/users/register`)
            .send(user_body)
            .then((err, res) => {
                chai.request(server)
                    .post(`/users/login`)
                    .send(user_body_2)
                    .end((err, res) => {
                        jwtToken.jwtToken = res.body.data.jwtToken
                        user_is_main_body.idUser = res.body.data.user.idUser

                        chai.request(server)
                            .post(`/houses`)
                            .send(house_body)
                            .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                            .end((err, res2) => {
                                user_is_main_body.idHouse = res2.body.data.idHouse
                            })
                    })
            })
    })
    beforeEach(async () => {
        await db.UserIsMain.destroy({ where: {}, truncate: { cascade: true } })
    })
    after(async () => {
        await db.UserIsMain.destroy({ where: {}, truncate: { cascade: true } })
        await db.User.destroy({ where: {}, truncate: { cascade: true } })
        await db.House.destroy({ where: {}, truncate: { cascade: true } })
    })

    describe('POST /', () => {
        it('it should NOT POST user is main if token not provided', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(user_is_main_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT POST user is main if token not valid', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer a')
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT POST user is main if idUser not provided', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send({ idHouse: 1 })
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT POST user is main if idHouse not provided', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send({ idUser: 1 })
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it("it should NOT POST user is main if idHouse or idUser doesn't exist in db", done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send({ idUser: 6789, idHouse: 1234 })
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(500)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should POST user is main', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.have.property('status').eql('success')
                    res.body.should.have.property('data').that.is.an('object')
                    done()
                })
        })
    })

    describe('PUT /', () => {
        it('it should NOT PUT user is main if token not provided', done => {
            chai.request(server)
                .put(`${API_URL}/1`)
                .send(user_is_main_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT PUT user is main if token not valid', done => {
            chai.request(server)
                .put(`${API_URL}/1`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT PUT user is main if user is main not found', done => {
            chai.request(server)
                .put(`${API_URL}/1`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should PUT user is main', done => {
            const new_house = { idHouse: 0, idUserIsMain: 0 }
            chai.request(server)
                .post(`${API_URL}/`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.body.data.should.have.property('idHouse').eql(user_is_main_body.idHouse)
                    new_house.idUserIsMain = res.body.data.idUserIsMain

                    chai.request(server)
                        .post(`/houses`)
                        .send({ nameHouse: 'testPutHouse' })
                        .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                        .end((err, res) => {
                            res.body.data.should.have.property('nameHouse').eql('testPutHouse')
                            new_house.idHouse = res.body.data.idHouse

                            chai.request(server)
                                .put(`${API_URL}/${new_house.idUserIsMain}`)
                                .send({ idHouse: new_house.idHouse })
                                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                                .end((err, res2) => {
                                    res2.should.have.status(200)
                                    res2.body.should.have.property('status').eql('success')
                                    res2.body.should.have.property('data').that.is.an('object')
                                    res2.body.data.should.have.property('idHouse').eql(res.body.data.idHouse)
                                    done()
                                })
                        })
                })
        })
    })

    describe('DELETE /:id', () => {
        it('it should NOT DELETE user is main if token not provided', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .send(user_is_main_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE user is main if token not valid', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE user is main if user is main id not provided', done => {
            chai.request(server)
                .delete(`${API_URL}/`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE user is main if user is main not found', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should DELETE user is main', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    chai.request(server)
                        .delete(`${API_URL}/${res.body.data.idUserIsMain}`)
                        .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.have.property('status').eql('success')
                            done()
                        })
                })
        })
    })

    describe('GET /', () => {
        it('it should NOT GET user_is_main if token not provided', done => {
            chai.request(server)
                .get(`${API_URL}/`)
                .send(user_is_main_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET user is main if token not valid', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET user_is_main if not user_is_main found', done => {
            chai.request(server)
                .get(`${API_URL}/`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should GET user_is_main', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    chai.request(server)
                        .get(`${API_URL}/`)
                        .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.have.property('status').eql('success')
                            res.body.should.have.property('data').that.is.an('array')
                            done()
                        })
                })
        })
    })

    describe('GET /:id', () => {
        it('it should NOT GET user is main if token not provided', done => {
            chai.request(server)
                .get(`${API_URL}/1`)
                .send(user_is_main_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET user is main if token not valid', done => {
            chai.request(server)
                .get(`${API_URL}/1`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET user is main if user is main not found', done => {
            chai.request(server)
                .get(`${API_URL}/1`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should GET user is main', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    chai.request(server)
                        .get(`${API_URL}/${res.body.data.idUserIsMain}`)
                        .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.have.property('status').eql('success')
                            res.body.should.have.property('data').that.is.an('object')
                            done()
                        })
                })
        })
    })

    describe('GET /houses/:id', () => {
        it('it should NOT GET user is main if token not provided', done => {
            chai.request(server)
                .get(`${API_URL}/houses/1`)
                .send(user_is_main_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET user is main if token not valid', done => {
            chai.request(server)
                .get(`${API_URL}/houses/1`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET user is main if user is main not found', done => {
            chai.request(server)
                .get(`${API_URL}/houses/1`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should GET user is main', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    chai.request(server)
                        .get(`${API_URL}/houses/${res.body.data.idHouse}`)
                        .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.have.property('status').eql('success')
                            res.body.should.have.property('data').that.is.an('array')
                            done()
                        })
                })
        })
    })

    describe('GET /me', () => {
        it('it should NOT GET user is main if token not provided', done => {
            chai.request(server)
                .get(`${API_URL}/me`)
                .send(user_is_main_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET user is main if token not valid', done => {
            chai.request(server)
                .get(`${API_URL}/me`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET user is main if user is main not found', done => {
            chai.request(server)
                .get(`${API_URL}/me`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should GET user is main', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(user_is_main_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    chai.request(server)
                        .get(`${API_URL}/me`)
                        .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
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

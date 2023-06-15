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

const API_URL = '/devices'

const device_body = {
    idDevice: 5,
}
const jwtToken = {
    jwtToken: '',
}
//Our parent block
describe('Devices', () => {
    before(async () => {
        await db.Device.destroy({ where: {}, truncate: { cascade: true } })
        await db.User.destroy({ where: {}, truncate: { cascade: true } })
        const user_body = {
            username: 'testCreate',
            email: 'testCreate@clvrhouse.com',
            password: 'testPwd',
        }
        const user_body_2 = {
            login: 'testCreate',
            password: 'testPwd',
        }
        chai.request(server)
            .post(`/users/register`)
            .send(user_body)
            .end((err, res) => {
                chai.request(server)
                    .post(`/users/login`)
                    .send(user_body_2)
                    .end((err, res) => {
                        jwtToken.jwtToken = res.body.data.jwtToken
                    })
            })
    })
    beforeEach(async () => {
        await db.Device.destroy({ where: {}, truncate: { cascade: true } })
    })
    after(async () => {
        await db.Device.destroy({ where: {}, truncate: { cascade: true } })
        await db.User.destroy({ where: {}, truncate: { cascade: true } })
    })

    describe('POST /', () => {
        it('it should NOT POST device if token not provided', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(device_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE device if token not valid', done => {
            chai.request(server)
                .delete(`${API_URL}/${device_body.idDevice}`)
                .send(device_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT POST device if idDevice not provided', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should POST device', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(device_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.have.property('status').eql('success')
                    res.body.should.have.property('data').that.is.an('object')
                    res.body.data.should.have.property('idDevice').eql(device_body.idDevice)
                    done()
                })
        })
    })

    describe('DELETE /:id', () => {
        it('it should NOT DELETE device if token not provided', done => {
            chai.request(server)
                .delete(`${API_URL}/${device_body.idDevice}`)
                .send(device_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE device if token not valid', done => {
            chai.request(server)
                .delete(`${API_URL}/${device_body.idDevice}`)
                .send(device_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE device if device id not provided', done => {
            chai.request(server)
                .delete(`${API_URL}/`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE device if device not found', done => {
            chai.request(server)
                .delete(`${API_URL}/${device_body.idDevice + 1}`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should DELETE device', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .send(device_body)
                .end((err, res) => {
                    chai.request(server)
                        .delete(`${API_URL}/${device_body.idDevice}`)
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
        it('it should NOT GET devices if token not provided', done => {
            chai.request(server)
                .get(`${API_URL}/`)
                .send(device_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE device if token not valid', done => {
            chai.request(server)
                .delete(`${API_URL}/${device_body.idDevice}`)
                .send(device_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET devices if not devices found', done => {
            chai.request(server)
                .get(`${API_URL}/`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should GET devices', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(device_body)
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
        it('it should NOT DELETE device if token not provided', done => {
            chai.request(server)
                .get(`${API_URL}/${device_body.idDevice}`)
                .send(device_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE device if token not valid', done => {
            chai.request(server)
                .delete(`${API_URL}/${device_body.idDevice}`)
                .send(device_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET device if device not found', done => {
            chai.request(server)
                .get(`${API_URL}/${device_body.idDevice + 1}`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should GET device', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(device_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    chai.request(server)
                        .get(`${API_URL}/${device_body.idDevice}`)
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
})

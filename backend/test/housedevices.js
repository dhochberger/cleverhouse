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

const API_URL = '/housedevices'

const house_devices_body = {
    idDevice: '0',
    idHouse: '0',
}
const jwtToken = {
    jwtToken: '',
}
//Our parent block
describe('HouseDevices', () => {
    before(async () => {
        await db.HouseDevices.destroy({ where: {}, truncate: { cascade: true } })
        await db.House.destroy({ where: {}, truncate: { cascade: true } })
        await db.Device.destroy({ where: {}, truncate: { cascade: true } })
        const user_body = {
            username: 'testCreate',
            email: 'testCreate@clvruser_is_main.com',
            password: 'testPwd',
        }
        const device_body = {
            idDevice: 9871232,
        }
        const house_body = {
            nameHouse: 'testClvrHouse',
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

                        chai.request(server)
                            .post(`/devices`)
                            .send(device_body)
                            .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                            .end((err, res2) => {
                                house_devices_body.idDevice = res2.body.data.idDevice

                                chai.request(server)
                                    .post(`/houses`)
                                    .send(house_body)
                                    .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                                    .end((err, res3) => {
                                        house_devices_body.idHouse = res3.body.data.idHouse
                                    })
                            })
                    })
            })
    })
    beforeEach(async () => {
        await db.HouseDevices.destroy({ where: {}, truncate: { cascade: true } })
    })
    after(async () => {
        await db.HouseDevices.destroy({ where: {}, truncate: { cascade: true } })
        await db.House.destroy({ where: {}, truncate: { cascade: true } })
        await db.Device.destroy({ where: {}, truncate: { cascade: true } })
    })

    describe('POST /', () => {
        it('it should NOT POST house devices if token not provided', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_devices_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT POST house devices if token not valid', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_devices_body)
                .set('Authorization', 'Bearer a')
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT POST house devices if idHouse not provided', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send({ idDevice: 1 })
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT POST house devices if idDevice not provided', done => {
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
        it("it should NOT POST house devices if idDevice or idHouse doesn't exist in db", done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send({ idHouse: 6789, idDevice: 1234 })
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(500)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should POST house devices', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_devices_body)
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
        it('it should NOT PUT house devices if token not provided', done => {
            chai.request(server)
                .put(`${API_URL}/1`)
                .send(house_devices_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT PUT house devices if token not valid', done => {
            chai.request(server)
                .put(`${API_URL}/1`)
                .send(house_devices_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT PUT house devices if house devices not found', done => {
            chai.request(server)
                .put(`${API_URL}/1`)
                .send(house_devices_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should PUT house devices', done => {
            const newDevice = { idDevice: 0, idHouseDevices: 0 }
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_devices_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.body.data.should.have.property('idDevice').eql(house_devices_body.idDevice)
                    newDevice.idHouseDevices = res.body.data.idHouseDevices

                    chai.request(server)
                        .post(`/devices`)
                        .send({ idDevice: 999 })
                        .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                        .end((err, res) => {
                            newDevice.idDevice = res.body.data.idDevice

                            chai.request(server)
                                .put(`${API_URL}/${newDevice.idHouseDevices}`)
                                .send({ idDevice: newDevice.idDevice })
                                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                                .end((err, res2) => {
                                    res2.should.have.status(200)
                                    res2.body.should.have.property('status').eql('success')
                                    res2.body.should.have.property('data').that.is.an('object')
                                    res2.body.data.should.have.property('idDevice').eql(res.body.data.idDevice)
                                    done()
                                })
                        })
                })
        })
    })

    describe('DELETE /:id', () => {
        it('it should NOT DELETE house devices if token not provided', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .send(house_devices_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE house devices if token not valid', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .send(house_devices_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE house devices if house devices id not provided', done => {
            chai.request(server)
                .delete(`${API_URL}/`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE house devices if house devices not found', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should DELETE house devices', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_devices_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    chai.request(server)
                        .delete(`${API_URL}/${res.body.data.idHouseDevices}`)
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
        it('it should NOT GET house devices if token not provided', done => {
            chai.request(server)
                .get(`${API_URL}/`)
                .send(house_devices_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET house devices if token not valid', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .send(house_devices_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET house devices if not house devices found', done => {
            chai.request(server)
                .get(`${API_URL}/`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should GET house devices', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_devices_body)
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
        it('it should NOT GET house devices if token not provided', done => {
            chai.request(server)
                .get(`${API_URL}/1`)
                .send(house_devices_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET house devices if token not valid', done => {
            chai.request(server)
                .get(`${API_URL}/1`)
                .send(house_devices_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET house devices if house devices not found', done => {
            chai.request(server)
                .get(`${API_URL}/1`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should GET house devices', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_devices_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    chai.request(server)
                        .get(`${API_URL}/${res.body.data.idHouseDevices}`)
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

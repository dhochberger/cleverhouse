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

const API_URL = '/houses'

const house_body = {
    nameHouse: 'clvrTestHouse',
}
const jwtToken = {
    jwtToken: '',
}
//Our parent block
describe('Houses', () => {
    before(async () => {
        await db.House.destroy({ where: {}, truncate: { cascade: true } })
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
                    })
            })
    })
    beforeEach(async () => {
        await db.House.destroy({ truncate: { cascade: true } })
    })
    after(async () => {
        await db.User.destroy({ truncate: { cascade: true } })
        await db.House.destroy({ truncate: { cascade: true } })
    })

    describe('POST /', () => {
        it('it should NOT POST house if token not provided', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT POST house if token not valid', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_body)
                .set('Authorization', 'Bearer a')
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT POST house if nameHouse not provided', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should POST house', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_body)
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
        it('it should NOT PUT house if token not provided', done => {
            chai.request(server)
                .put(`${API_URL}/1`)
                .send(house_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT PUT house if token not valid', done => {
            chai.request(server)
                .put(`${API_URL}/1`)
                .send(house_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT PUT house if house not found', done => {
            chai.request(server)
                .put(`${API_URL}/1`)
                .send(house_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should PUT house', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.body.data.should.have.property('nameHouse').eql(house_body.nameHouse)

                    chai.request(server)
                        .put(`${API_URL}/${res.body.data.idHouse}`)
                        .send({ nameHouse: 'testPut' })
                        .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.have.property('status').eql('success')
                            res.body.should.have.property('data').that.is.an('object')
                            res.body.data.should.have.property('nameHouse').eql('testPut')
                            done()
                        })
                })
        })
    })

    describe('DELETE /:id', () => {
        it('it should NOT DELETE house if token not provided', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .send(house_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE house if token not valid', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .send(house_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE house if house id not provided', done => {
            chai.request(server)
                .delete(`${API_URL}/`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT DELETE house if house not found', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should DELETE house', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    chai.request(server)
                        .delete(`${API_URL}/${res.body.data.idHouse}`)
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
        it('it should NOT GET houses if token not provided', done => {
            chai.request(server)
                .get(`${API_URL}/`)
                .send(house_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET house if token not valid', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .send(house_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET houses if not houses found', done => {
            chai.request(server)
                .get(`${API_URL}/`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should GET houses', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_body)
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
        it('it should NOT GET house if token not provided', done => {
            chai.request(server)
                .get(`${API_URL}/1`)
                .send(house_body)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET house if token not valid', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .send(house_body)
                .set('Authorization', 'Bearer a' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should NOT GET house if house not found', done => {
            chai.request(server)
                .delete(`${API_URL}/1`)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
        it('it should GET house', done => {
            chai.request(server)
                .post(`${API_URL}/`)
                .send(house_body)
                .set('Authorization', 'Bearer ' + jwtToken.jwtToken)
                .end((err, res) => {
                    chai.request(server)
                        .get(`${API_URL}/${res.body.data.idHouse}`)
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

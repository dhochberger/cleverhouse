require('dotenv').config({ path: __dirname + './env' })
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const passport = require('passport')
require('./config/passport')

const app = express()

const users = require('./routes/UserRoutes.js')
const user_is_main = require('./routes/UserIsMainRoutes.js')
const devices = require('./routes/DeviceRoutes.js')
const houses = require('./routes/HouseRoutes.js')
const user_devices = require('./routes/UserDevicesRoutes.js')
const house_devices = require('./routes/HouseDevicesRoutes.js')

const port = process.env.API_PORT || 3000

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
}

app.use(helmet())
app.use(cors())

app.use('/users', users)
app.use('/userIsMain', user_is_main)
app.use('/userdevices', user_devices)
app.use('/housedevices', house_devices)
app.use('/devices', devices)
app.use('/houses', houses)

app.get('/favicon.ico', (req, res) => res.status(204))

const Util = require('./utils/Utils')
const util = new Util()
app.get('/', (req, res) => {
    util.setSuccess(200, 'CleverHouse Index API')
    return util.send(res)
})

app.listen(process.env.API_PORT, () => {
    console.log(`CleverHouse API running on port ${process.env.API_PORT}`)
})

module.exports = app

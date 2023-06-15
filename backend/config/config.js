require('dotenv').config()

const { HOST_DB, USERNAME_DB, PWD_DB, NAME_DB } = process.env;

module.exports = {
    "development": {
        "username": USERNAME_DB,
        "password": PWD_DB,
        "database": NAME_DB+'_dev',
        "host": HOST_DB,
        "dialect": "postgres",
        "logging": (event) => console.log(event)
        //"port": PORT_DB,
    },
    "test": {
        "username": USERNAME_DB,
        "password": PWD_DB,
        "database": NAME_DB+'_test',
        "host": HOST_DB,
        "dialect": "postgres",
        "logging": false
    },
    "production": {
        "username": USERNAME_DB,
        "password": PWD_DB,
        "database": NAME_DB+'_prod',
        "host": HOST_DB,
        "dialect": "postgres",
        "logging": false
    }
};
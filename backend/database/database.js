const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configJson = require('../config/config');

const basename = path.basename(__filename);
require('dotenv').config();

const env_db = process.env.NODE_ENV === 'development' ? '_dev' : process.env.NODE_ENV === 'test' ? '_test' : '_production'
const db_name = process.env.NAME_DB + env_db

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = configJson[env];

console.log('Actual environment: ', env);
console.log(config)
const pathModels = path.join(__dirname, '../Models')

const db = {};

let sequelize;
if (config.environment === 'production') {
  sequelize = new Sequelize(
      process.env[config.use_env_variable], config
    );
  sequelize = new Sequelize(
    process.env.NAME_DB+env_db,
    process.env.USERNAME_DB,
    process.env.PWD_DB, {
      host: process.env.DB_HOST,
      port: process.env.PORT_DB,
      dialect: 'postgres',
      dialectOption: {
        ssl: true,
        native: true
      },
    }
  );
} else {
  sequelize = new Sequelize(
     config.database, config.username, config.password, config
  );
}

fs
  .readdirSync(pathModels)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && 
           (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = require(path.join(pathModels, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
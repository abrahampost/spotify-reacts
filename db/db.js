let Sequelize = require('sequelize');

let options = {
    dialect: process.env.DATABASE_DIALECT,
    logging: false,
}
if (process.env.DATABASE_DIALECT === 'sqlite') {
    options['storage'] = process.env.DATABASE_STORAGE;

}

let sequelize = new Sequelize(process.env.DATABASE_URL, options);

module.exports = sequelize;
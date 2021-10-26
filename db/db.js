let Sequelize = require('sequelize');

let options = {
    dialect: process.env.DATABASE_DIALECT,
    logging: false
}
if (process.env.DATABASE_DIALECT === 'sqlite') {
    options['storage'] = process.env.DATABASE_STORAGE;
} else if (process.env.DATABASE_DIALECT === 'postgres') {
    options['protocol'] = 'postgres';
    options['dialectOptions'] = { ssl: true, rejectUnauthorized: false };
}

let sequelize = new Sequelize(process.env.DATABASE_URL, options);

sequelize.authenticate().then(() => {
    console.log('Successfully connected to database');
}, (err) => {
    console.error('Unable to connect to database', err);
})

module.exports = sequelize;
const db = require('./db');

const initTables = exports.initTables = async () => {
    await db.sync({ alter: true });
}
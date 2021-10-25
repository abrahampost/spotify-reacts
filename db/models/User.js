const   Sequelize   = require("sequelize"),
        db          = require("../db");


const User = exports.Model = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        require: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.TEXT,
        allowNull: false,
        require: true,
        unique: true,
        validate: {
            isAlphanumeric: true
        }
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
        require: true
    }
});
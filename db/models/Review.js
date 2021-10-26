const   Sequelize   = require("sequelize"),
        db          = require("../db");


const Review = exports.Model = db.define('review', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        require: true,
        primaryKey: true
    },
    albumId: {
        type: Sequelize.STRING,
        require: true
    },
    rating: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        require: true
    },
    content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
        require: false
    },
    userName: {
        type: Sequelize.STRING,
        require: true
    }
});
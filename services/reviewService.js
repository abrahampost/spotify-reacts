const Review = require('../db/models').Review;
const sequelize = require('../db/db');

/**
 * 
 * @param {string} albumId 
 * @param {number} page 
 * @returns 
 */
exports.getReviewsForAlbum = async (albumId, page) => {
    let data = await Review.findAll({
        where:{
            albumId
        },
        orderBy: [ sequelize.col('createdAt'), 'DESC' ],
        limit: 10,
        offset: 10 * (page || 0)
    });
    return data;
}

/**
 * 
 * @param {string} albumId 
 * @param {string} userId 
 * @param {string} rating 
 * @param {string} review 
 * @returns 
 */
exports.makeReview = async (albumId, userName, rating, content) => {
    let data = await Review.create({
        albumId,
        userName,
        rating,
        content
    });
    return data;
}

/**
 * 
 * @param {string} albumId 
 * @param {string} userId 
 * @returns 
 */
exports.userHasRatedAlbum = async (albumId, userId) => {
    let data = await Review.findOne({
        where: {
            albumId,
            userId
        }
    });
    return data;
}

exports.getUserReviews = async (userId, page) => {
    let data = await Review.findAll({
        where: {
            userId
        },
        limit: 10,
        offset: 10 * (page || 0)
    });

    return data;
}

/* Very innefficient way to do this, but I couldn't figure out how to do it with sequelize */
exports.getAverageReview = async (albumId) => {
    let data = await Review.findAll({
        where: {
            albumId
        }
    });
    return data.map(data => data.rating).reduce((acc, cur) => acc + cur, 0) / data.length;
}
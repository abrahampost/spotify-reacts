const   express = require('express'),
        router  = express.Router(),
        spotifyService = require('../services/spotifyService'),
        reviewService = require('../services/reviewService'),
        { cache } = require('../db/cache');

router.get('/search', async (req, res, next) => {
    try {
        let query = req.query.query;
        let data = await spotifyService.searchAlbums(query);
        res.json(data);
    } catch (e) {
        next(e);
    }
});

router.get('/releases', async (req, res, next) => {
    try {
        if (cache.get(req.route.path)) {
            res.send(cache.get(req.route.path));
            return;
        }
        let data = await spotifyService.getNewReleases();
        cache.put(req.route.path, data, 3600000);
        res.json(data);
    } catch (e) {
        next(e);
    }
})


router.get('/:id/reviews', async (req, res, next) => {
    try {
        let albumId = req.params.id;
        let page = req.query.p;
        let data = await reviewService.getReviewsForAlbum(albumId, page);
        res.json({ reviews: data });
    } catch(e) {
        next(e);
    }
});

router.post('/:id/reviews', async (req, res, next) => {
    try {
        const albumId = req.params.id;
        const userName = req.body.userName;
        const rating = req.body.rating;
        const content = req.body.content;
        
        let data = await reviewService.makeReview(albumId, userName, rating, content);
        res.json(data);
    } catch(e) {
        next(e);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        let albumId = req.params.id;
        Promise.all([spotifyService.getAlbumInfo(albumId), reviewService.getAverageReview(albumId)])
            .then(([data, averageReview]) => {
                res.json({...data, averageReview });
            }).catch((err) => {
                throw err;
            })
    } catch (e) {
        next(e);
    }
});

module.exports = router;
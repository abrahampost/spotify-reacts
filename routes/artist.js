const   express   = require('express'),
        router  = express.Router(),
        spotifyService = require('../services/spotifyService'),
        { cache } = require('../db/cache');

router.get('/:id/albums', async (req, res, next) => {
    try {
        if (cache.get(req.route.path)) {
            res.json(cache.get(req.route.path));
            return;
        }
        let artistId = req.params.id;
        let currentAlbum = req.query.current;
        let otherAlbums = await spotifyService.getAlbumsByArtist(artistId, currentAlbum);
        cache.put(req.route.path, otherAlbums, 3600000);
        res.json(otherAlbums);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
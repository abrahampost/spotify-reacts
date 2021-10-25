const   express   = require('express'),
        router  = express.Router(),
        spotifyService = require('../services/spotifyService');

let albumCache = {};

router.get('/:id/albums', async (req, res, next) => {
    try {
        if (albumCache[req.route.path]) {
            res.json(albumCache[req.route.path]);
            return;
        }
        let artistId = req.params.id;
        let currentAlbum = req.query.current;
        let otherAlbums = await spotifyService.getAlbumsByArtist(artistId, currentAlbum);
        albumCache[req.route.path] = otherAlbums;
        res.json(otherAlbums);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
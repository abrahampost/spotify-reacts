const SpotifyWebApi = require('spotify-web-api-node');
const { getAverageReview } = require('./reviewService');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

const refreshToken = () => {
    spotifyApi.clientCredentialsGrant()
        .then(res => {
            console.log(`Successfully retrieved access token. Expires in ${res.body.expires_in}`);
            spotifyApi.setAccessToken(res.body.access_token);
        });
}

refreshToken();

setInterval(() => {
    refreshToken();
}, 3000000)

exports.searchAlbums = async (query) => {
    let res = await spotifyApi.searchAlbums(query, { limit: 10, offset: 0, include_external: false, market: 'US' });
    let albums = res.body.albums.items || [];
    return Promise.all(albums.map(async (album) => {
        let rating = await getAverageReview(album.id);
        return {...album, rating };
    }));
}

exports.getAlbumInfo = async (albumId) => {
    let res = await spotifyApi.getAlbum(albumId, { market: 'US' });
    return res.body;
}

exports.getNewReleases = async (albumId) => {
    let res = await spotifyApi.getNewReleases({ country: 'US', limit: 3 });
    let albums = res.body.albums && res.body.albums.items || [];
    return Promise.all(albums.map(async (album) => {
        let rating = await getAverageReview(album.id);
        return {...album, rating };
    }));
}

exports.getAlbumsByArtist = async (artistId, currentAlbum) => {
    let res = await spotifyApi.getArtistAlbums(artistId, { limit: 4, offset: 0 });

    let data = res.body.items;
    return data.filter((album) => album.id !== currentAlbum).slice(0, 3) || [];
}
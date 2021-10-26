# Spotify-Reacts
A full-stack application using node/express and React to leave reviews on Spotify albums.

## Register a Spotify integration
- [Log into dashboard to create an app](https://developer.spotify.com/dashboard/)
- Generate client credentials

## To run
Note: To run locally, need JSON saved in root of project as env.local.json
{
    "NODE_ENV": "local",
    "PORT": 8000,
    "SIGN_KEY": "",
    "DATABASE_URL": "sqlite::memory",
    "DATABASE_DIALECT": "sqlite",
    "DATABASE_STORAGE": "db/testdb.db",
    "SPOTIFY_CLIENT_ID": "", //get this from spotify developer API
    "SPOTIFY_CLIENT_SECRET": "" //get this from spotify developer API
}

---
*Note:* There is some stub code for authentication I never quite finished up and can be ignored.
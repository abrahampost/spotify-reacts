const   SpotifyReactsError = require('./').SpotifyReactsError,
        APIError = require('./').APIError;

const exceptionHandler = (err, req, res, next) => {
    if (err instanceof APIError) {
        res.status(err.code).send(`${err.name}: ${err.message}`);
    } else if (err instanceof SpotifyReactsError) {
        res.status(400).send(err.message);
    } else {
        console.error(err);
        res.status(500).send('An internal exception occured');
    }
}

module.exports = exceptionHandler;
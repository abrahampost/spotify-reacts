class SpotifyReactsError extends Error {};
exports.SpotifyReactsError = SpotifyReactsError;

class APIError extends SpotifyReactsError {
    /**
     * 
     * @param {*} code 
     * @param {*} message 
     * @param {*} errorName 
     */
    constructor(code, message, errorName) {
        super(message);
        this.code = code;
        this.name = errorName || 'APIError';
    }

    toString() {
        return `${this.name}(${this.code}): ${this.message}`;
    }
}

exports.APIError = APIError;
const   express = require('express'),
        app = express(),
        morgan = require('morgan'),
        cookieParser = require('cookie-parser'),
        jwt         = require('jsonwebtoken'),
        initTables = require('./db/init-tables').initTables,
        path        = require('path');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(morgan('dev'));
app.use(cookieParser());

app.use((req, res, next) => {
    let auth = req.cookies['_auth'];
    if (auth === undefined) {
        next();
        return;
    }
    const data = jwt.verify(auth, process.env.SIGN_KEY);
    req.userId = data;
    next();
});

const routes = require('./routes')
app.use('/api', routes);

const exceptionHandler = require('./exceptions/exceptionHandler');
app.use(exceptionHandler);

try {
    initTables();
} catch(e) {
    console.error(e);
}

if (process.env.NODE_ENV === 'production') {
    console.log('serving assets at: ' + path.join(__dirname, 'ui/build'))
    app.use(express.static(path.join(__dirname, 'ui/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'ui/build/index.html'));
    })
}

module.exports = app;
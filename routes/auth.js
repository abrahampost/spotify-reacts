const   express     = require('express'),
        userService        = require('../services/userService'),
        router      = express.Router(),
        APIError    = require('../exceptions').APIError;

router.post('/register', async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    try {
        await userService.signUp(username, password);
        res.sendStatus(200);
    } catch(e) {
        if (e.name == "SequelizeUniqueConstraintError") {
            next(new APIError(409, 'A user exists with this information'))
        }
        next(e);
    }
})

router.post('/login', async (req, res, next) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let { token, user} = await userService.login(username, password);
        res
            .status(200)
            .cookie('_auth', token, { maxAge: 900000, httpOnly: true})
            .send(user);
    } catch(e) {
        next(e);
    }
});

router.post('/logout', (req, res) => {
    res.status(200).clearCookie('_auth').end();
})

module.exports = router;
const   User        = require('../db/models').User,
        bcrypt      = require("bcryptjs"),
        jwt         = require("jsonwebtoken"),
        APIError    = require('../exceptions').APIError;


/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @returns 
 */
 exports.login = async function (username, password) {
    let user = await User.findOne({where: {username: username}})
    if (!user) throw new APIError(401, 'Incorrect username or password');
    let result = await bcrypt.compare(password, user.password)
    if (result) {
            return {
            token: jwt.sign({
                    id: user.id
                }, process.env.SIGN_KEY, {
                    expiresIn: "2 weeks"
                }),
            user: {
                id: user.id,
                username: user.username
            }
        };
    }

    throw new APIError(401, 'Incorrect username or password');
}

/**
 * 
 * @param {String} username 
 * @param {String} unhashed_password 
 * @returns 
 */
exports.signUp = async function(username, unhashed_password) {
    ValidatePassword(unhashed_password);
    let salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(unhashed_password, salt);
    let user = await User.build({
        username,
        password
    });
    await user.save();
}

exports.getUser = async (username) => {
    let user = await User.findOne({
        where: {
            username
        }
    });
    return user;
}

let ValidatePassword = (password) => {
    //TODO: Add more password validations
    if (password.length < 7 || password.length > 40) {
        throw new Error("password length not valid");
    }
}
let jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config();

const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET

module.exports = {
    generateTokenForUser: (userdata) => {
        return jwt.sign({
            userId: userdata.userId,
            isAdmin: userdata.isAdmin
        },
            JWT_SIGN_SECRET,
            {
                expiresIn: '1h'
            }

        )
    }
}
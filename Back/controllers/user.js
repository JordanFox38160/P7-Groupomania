// Bcrypt:
let bcrypt = require("bcrypt");

// Jsonwebtoken d'authentification:
let jwtUtils = require('../utils/jwt.utils')

// Import du models user:
let models = require('../models')

exports.signup = (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let bio = req.body.bio;

    if (email == null || username == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }
    console.log(req.body);

    try {
        models.User.findOne({
            attributes: ['email'],
            where: { email: email, },
        })

            .then(
                ((userFound) => {
                    if (!userFound) {
                        bcrypt.hash(password, 5, function (err, bcryptPassword) {
                            const newUser = models.User.create({
                                email: email,
                                username: username,
                                password: bcryptPassword,
                                bio: bio,
                                admin: 0,
                            })
                                .then((userFound) => {
                                    return res.status(201).json('Utilisateur crée');
                                })
                        });
                    } else {
                        return res.status(409).json({
                            error: "Ce compte existe déjà ",
                        });
                    }
                }),

            )

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
}


exports.login = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }
    models.User.findOne({
        where: { email: email, },
    })
        .then((userFound) => {
            if (userFound) {
                bcrypt.compare(password, userFound.password, (errBcrypt, resBcrypt) => {
                    if (resBcrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json({ "error": "invalid password" });
                    }
                })

            } else {
                return res.status(404).json({ 'error': 'user not existe in DB' })
            }
        })
        .catch((err) => {
            return res.status(500).json({ 'error': 'unable to verify user' })
        })

}
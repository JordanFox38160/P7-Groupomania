const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { inscriptionErrors, connexionErrors } = require('../utils/errros');
const bcrypt = require('bcrypt')
require('dotenv').config({ path: './config/.env' })

//Service d'inscription
exports.inscription = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new UserModel({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ user }))
                .catch(error => res.status(400).json({ error: 'Adresse Email déjà utilisée' }));
        })
        .catch(error => res.status(500).json({ error }))
};

//Service de connexion
exports.connexion = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => console.log('hash :', hash))
    UserModel.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                //Si aucun utilisateur n'est trouver, on renvoie une erreur 404 et un json avec 'Impossible de se connecter'
                return res.status(401).json({ error: 'Impossible de se connecter' })
            }
            console.log(user.password)
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: '24H' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))

};

//Service de deconnexion
module.exports.deconnexion = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}
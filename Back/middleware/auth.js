const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env' })

module.exports = (req, res, next) => {
    try {
        //Ici on crée une variable token pour récupéré le header authorization ou est renseigner notre token
        const token = req.headers.authorization.split(' ')[1]; //<=== Ici on précise [1] pour bien ciblé le token et non le mot "Bearead"
        //Ont utilise jwt.verify(token, 'TOKEN') afin de vérifier notre token pour être sur qu'il correspond a notre token encodé
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        //Ici ont récupére le UserId
        const userId = decodedToken.userId;
        //Ici ont récupére le IsAdmin
        const isAdmin = decodedToken.isAdmin;

        req.auth = { userId, isAdmin }
        //Ici on vérifie si le UserID de la requête correspond bien avec celui du token
        if (req.body.userId && req.body.userId !== userId) {
            //Si cela ne correspond pas, on revois ça :
            throw 'User ID non valable';
        } else {
            console.log(req.auth)
            //Si le UserID de la requête correspond bien avec celui du token ont peut passer la requête au prochain middleware
            next();
        }
    } catch (error) {
        res.status(401).json({ message: 'Requête non authentifié !' });
    }
};
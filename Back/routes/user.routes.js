const router = require('express').Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

//Route user

//Route pour l'inscription
router.post("/inscription", authController.inscription);

//Route pour la connexion
router.post('/connexion', authController.connexion);

//Route pour récupéré tout les users
router.get('/', userController.getAllUsers);

//Route pour récupéré un user (suivant son id)
router.get('/:id', userController.usersInfo);

//Route pour supprimer un user
router.delete('/:id', userController.deleteUser);

module.exports = router;
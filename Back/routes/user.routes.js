const router = require('express').Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const multer = require('../middleware/multer-config');

//Route user

//Route pour l'inscription
router.post("/inscription", authController.inscription);

//Route pour la connexion
router.post('/connexion', authController.connexion);

//Route pour la deconnexion
router.get('/deconnexion', authController.deconnexion);

//Route pour récupéré tout les users
router.get('/', userController.getAllUsers);

//Route pour récupéré un user (suivant son id)
router.get('/:id', userController.usersInfo);

//Route pour mettre a jour un user (bio, image de profil ect...)
router.put('/:id', userController.updateUser);

//Route pour supprimer un user
router.delete('/:id', userController.deleteUser);

//Ajouter un image
// router.post('/upload', upload.single('file'), userController.uploadProfil);

module.exports = router;
const router = require('express').Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

//Route pour lire tout les post
router.get('/', postController.readPost);

//Route pour récupéré un post
router.get('/:id', postController.readOnePost);

//Route pour crée un post
router.post('/', auth, multer, postController.createPost);

//Route pour mettre a jour un post
router.put('/:id', auth, multer, postController.updatePost);

//Route pour mettre un like a un post
router.post('/likes/:id', auth, multer, postController.likePost);

//Route pour supprimer un post
router.delete('/:id', auth, postController.deletePost);

//Commentaires

module.exports = router;

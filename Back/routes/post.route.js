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

//Route pour supprimer un post
router.delete('/:id', auth, postController.deletePost);

//Commentaires
//Route pour commenter un post
router.patch('/comment-post/:id', auth, postController.commentPost);

//Route pour editer un post
router.patch('/edit-comment-post/:id', auth, postController.editCommentPost);

//Route pour supprimer un post
router.patch('/delete-comment-post/:id', auth, postController.deleteCommentPost);

module.exports = router;

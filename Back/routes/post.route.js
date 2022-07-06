const router = require('express').Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

//Route pour lire un post
router.get('/', postController.readPost);

//Route pour crée un post
router.post('/', auth, multer, postController.createPost);

//Route pour mettre a jour un post
router.put('/:id', auth, multer, postController.updatePost);

//Route pour supprimer un post
router.delete('/:id', auth, postController.deletePost);

//Route pour liker un post
router.patch('/like-post/:id', auth, postController.likePost);

//Route pour unlike un post
router.patch('/unlike-post/:id', auth, postController.unlikePost);

//Commentaires
//Route pour commenter un post
router.patch('/comment-post/:id', auth, postController.commentPost);

//Route pour editer un post
router.patch('/edit-comment-post/:id', auth, postController.editCommentPost);

//Route pour supprimer un post
router.patch('/delete-comment-post/:id', auth, postController.deleteCommentPost);

module.exports = router;

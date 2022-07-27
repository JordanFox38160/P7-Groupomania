const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs');

//Ici on gére la récupération de TOUT les post
module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        //Si il n'y pas d'erreur, alors on renvoie la data (docs)
        if (!err) res.send(docs);
        else console.log('Error to get data' + err);
        //Ici on utilise.sort pour pouvoir afficher le dernier message en 1er
    }).sort({ createdAt: -1 });

};

//Service de récupération des post d'un seul user
module.exports.readOnePost = (req, res) => {
    //On vérifie si l'ID est valide
    if (!ObjectID.isValid(req.params.id))
        //Alors ont renvoi un status 400 en précisant que l'ont ne connais pas l'ID
        return res.status(400).send('ID unknown :' + req.params.id)
    PostModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID Unknow: ' + err)
        //Ici on précise que l'ont ne souhaite pas renvoyer le password
    })
};

//Service de récupération des post d'un seul user
module.exports.readAllPostUser = (req, res) => {
    //On vérifie si l'ID est valide
    if (!ObjectID.isValid(req.params.id))
        //Alors ont renvoi un status 400 en précisant que l'ont ne connais pas l'ID
        return res.status(400).send('ID unknown :' + req.params.id)
    PostModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID Unknow: ' + err)
        //Ici on précise que l'ont ne souhaite pas renvoyer le password
    })
};

//Ici on gére la création d'un post
module.exports.createPost = async (req, res) => {
    let fileName;
    fileName = req.body.userId + ".jpg";

    const newPost = new PostModel({
        userId: req.body.userId,
        pseudo: req.body.pseudo,
        message: req.body.message,
        title: req.body.title,
        likers: [],
        usersLiked: [],
        comments: [],
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(req.file)

    //Ici on incrémente notre data dans notre base de donnée mongoDB
    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err)
    }
}

//Ici on gére la mise a jour d'un post
module.exports.updatePost = async (req, res) => {
    //On vérifie si l'ID est valide
    if (!ObjectID.isValid(req.params.id))
        //Alors ont renvoi un status 400 en précisant que l'ont ne connais pas l'ID
        return res.status(400).send('ID unknown :' + req.params.id);

    const imgUploaded = Boolean(req.file)
    let initialPost;
    const postObject = req.file ?
        {
            picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    if (imgUploaded) {
        initialPost = await PostModel.findOne({ _id: req.params.id });
    }

    const updatedRecord = {
        title: req.body.title,
        message: req.body.message,
        picture: postObject,
    }

    PostModel.findByIdAndUpdate({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => {
            if (imgUploaded) {
                const filename = initialPost.picture.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => { });
            }
            req.params.id,
                { $set: updatedRecord },
                { new: true },
                (err, docs) => {
                    if (!err) res.send(docs);
                    else console.log("Update error:" + err)
                }
        }
        )

}

//Ici on gére la suppresion d'un post
module.exports.deletePost = (req, res) => {
    //On vérifie si l'ID est valide
    if (!ObjectID.isValid(req.params.id))
        //Alors ont renvoi un status 400 en précisant que l'ont ne connais pas l'ID
        return res.status(400).send('ID unknown :' + req.params.id);

    PostModel.findOne({ _id: req.params.id })
        .then(post => {
            //Ici on supprime l'image de la sauce
            const filename = post.picture.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                PostModel.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
}

//Ici on gère l'ajout d'un commentaire
module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

//Gestion des likes
exports.likePost = (req, res) => {
    console.log(req.body.userId)
    PostModel.findOne({ _id: req.params.id })
        .then((post) => {
            let options = {
                $inc: {},
                _id: req.params.id
            };
            const hasLiked = post.usersLiked.find(userId => userId == req.body.userId);

            //Ici ont gère l'ajout de like
            switch (req.body.like) {
                case 1:
                    //Si l'utilisateur a déja liker, alors on renvoie une erreur.
                    if (hasLiked) {
                        //Ici on enleve le like dans la priopriété $inc de notre objet options
                        options.$inc.likes = -1;
                        options.$pull = { usersLiked: req.body.userId }
                    } else {
                        //Ici on ajoute le like dans la priopriété $inc de notre objet options
                        options.$inc.likes = 1;
                        options.$push = { usersLiked: req.body.userId }
                    }

                    break;
                default:
                    //generer erreur car valeur non traitée
                    res.status(400).json({ message: 'Unsupported like parameter value' });
            }

            PostModel.updateOne({ _id: req.params.id }, options)
                .then(() => { res.status(201).json({ message: 'Avis pris en compte' }); })
                .catch((error) => { res.status(400).json({ error: error }); });
        });
}
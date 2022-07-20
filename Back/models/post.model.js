const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2')

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            trim: true,
            maxlength: 150,
            required: true
        },
        pseudo: {
            type: String,
            required: true
        },
        message: {
            type: String,
            trim: true,
            maxlength: 500,
            required: true
        },
        picture: {
            type: String,
        },
        likes: {
            type: Number,
            required: false
        },
        usersLiked: {
            type: Array,
            required: true
        },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number,
                }
            ],
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

PostSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('post', PostSchema);
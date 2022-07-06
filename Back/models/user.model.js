const mongoose = require('mongoose');
//Ici on utilise validator pour controler l'email
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trimp: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },
        bio: {
            type: String,
            max: 1024,
        },
        likes: {
            type: [String]
        },
        imageUrl: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
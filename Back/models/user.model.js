const mongoose = require('mongoose');
//Ici on utilise validator pour controler l'email
const { isEmail } = require('validator');

//ici on importe bcrypt pour crypter le mot de passe
const bcrypt = require('bcrypt')

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

userSchema.pre("save", async function (next) {
    //Ici on "sale" le mot de passe grâce a genSalt
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
const mongoose = require('mongoose');

//Ici on s'occupe de la connexion a mongoDB
mongoose
    .connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.scgjx.mongodb.net/test',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    )
    //On renvoie un message si la connexion a réussis, sinon on renvoie une erreur
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Failed to connect to MongoDB", err)); 
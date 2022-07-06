//Ici on appel express
const express = require('express');
const app = express();
require('dotenv').config({ path: './config/.env' })
require('./config/db');
app.use(express.json());

//Cors
const cors = require('cors');
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

//On importe nos routes
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.route')


//Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
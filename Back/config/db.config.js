//Connexion a la base de données
const dotenv = require("dotenv")
dotenv.config();

const mysql = require('mysql2');
const express = express();
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

let connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  if (err) throw err;
});

// app.post('/signup', (req, res) => {

//   const username = req.body.username
//   const password = req.body.password

//   connection.query("INSERT INTO users (username, password) VALUE (?,?)",
//     [username, password],
//     (err, result) => {
//       console.log(err);
//     })
// })

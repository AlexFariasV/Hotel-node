const express = require("express");
const app = express();
const port = 3000; // Altere a porta para 3000 ou outra porta disponível

var session = require("express-session");

const dotenv = require('dotenv');
dotenv.config();

app.use(express.static("app/public"));

/* const env = require("dotenv").config(); */

app.set("view engine", "ejs");
app.set("views", "./app/views");

 app.use(
  session({
    secret: "HotelNode",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })) 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

var rotas = require("./app/routes/router");
app.use("/", rotas);


app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port} \nhttp://localhost:${port}`);
});

//Express permite fazer roteamento, views etc
//Mongoose parecido com o LinQ (ORM) utilizando sintaxe JavaScript
//Nodmon serve para não precisar reabrir o servidor ao alterar um arquivo da aplicação
const express = require("express");     //Importando uma extensão para a variável
const mongoose = require("mongoose");
const cors = require("cors");

//Instanciando a aplicação
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(
    "mongodb://user:password@ds123456.mlab.com:54321/backend", 
    { 
        useNewUrlParser: true 
    }
);

//real time
app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

//Alocar aplicação em um endereço da máquina, geralmente usado em porta
server.listen(3000, () => {
    console.log('Server started on port 3000');
});
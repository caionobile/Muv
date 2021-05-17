const http = require('http');
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const exercicioRoutes = require('./rotas/exercicios');
const treinoRoutes = require('./rotas/treinos');
const usuarioRoutes = require('./rotas/usuarios');
const emailRoutes = require('./rotas/email');

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://Gabriel:33IVBWfibyvEb2Uq@muv.mk0b2.mongodb.net/site_muv?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  }
  )
  .then(() => {
    console.log("Conexão OK");
  })
  .catch(() => {
    console.log("Conexão NOK");
  });

//configura a porta do servidor e coloca em execução
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(porta);

app.use('/api/exercicios', exercicioRoutes);
app.use('/api/treinos', treinoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/email', emailRoutes);

module.exports = app;
//importa os módulos http e express
const http = require('http');
const express = require('express');

//constrói um objeto express
const app = express();

app.use(express.json());

//configura a porta do servidor e coloca em execução
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(porta);

const exercicios = [
  {
    id: "1",
    nome: "Abdominal leve",
    intensidade: 1,
    descrição:
      "Deitar em cima de um tapete, colocar mãos ao lado do corpo, deixar pernas levemente flexonadas e contrair o abdômem",
    sessoes: 3,
    repeticao: 15
  },
  {
    id: "2",
    nome: "Flexão",
    intensidade: 1,
    descrição:
      "Deitar em cima de um tapete, colocar mãos ao lado do corpo, deixar pernas levemente flexonadas e contrair o abdômem",
    sessoes: 3,
    repeticao: 15
  },
  {
    id: "3",
    nome: "Polichinelo",
    intensidade: 1,
    descrição:
      "Deitar em cima de um tapete, colocar mãos ao lado do corpo, deixar pernas levemente flexonadas e contrair o abdômem",
    sessoes: 3,
    repeticao: 15
  },
];
app.get("/api/exercicios", (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    exercicios: exercicios,
  });
});

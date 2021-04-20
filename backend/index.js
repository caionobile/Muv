const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

//configura a porta do servidor e coloca em execução
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(porta);

const exercicios = [
  {
    id: "1",
    nome: "Abdominal leve",
    intensidade: 2,
    descricao:
      "Deitar em cima de um tapete, colocar mãos ao lado do corpo, deixar pernas levemente flexonadas e contrair o abdômem",
    sessoes: 3,
    repeticoes: 15
  },
  {
    id: "2",
    nome: "Flexão",
    intensidade: 3,
    descricao:
      "Enim exercitation laborum consectetur incididunt. Incididunt fugiat exercitation pariatur exercitation adipisicing ullamco Lorem amet qui. Pariatur minim officia non esse in dolor commodo aliquip.",
    sessoes: 3,
    repeticoes: 10
  },
  {
    id: "3",
    nome: "Polichinelo",
    intensidade: 1,
    descricao:
      "Magna id consectetur incididunt adipisicing reprehenderit in enim sit in magna. Occaecat esse excepteur veniam incididunt nostrud quis ad voluptate. Magna ullamco eu tempor amet ipsum deserunt. Fugiat laborum sint quis nisi do sit eu dolore enim dolore ipsum dolor ad. Ut fugiat ipsum ipsum officia excepteur. Sint ea elit aliquip exercitation enim. Ea sint id magna sint exercitation ex consectetur culpa deserunt.",
    sessoes: 3,
    repeticoes: 30
  },
  {
    id: "4",
    nome: "Abdominal",
    intensidade: 3,
    descricao:
      "Deitar em cima de um tapete, colocar mãos ao lado do corpo, deixar pernas levemente flexonadas e contrair o abdômem",
    sessoes: 3,
    repeticoes: 30
  },
  {
    id: "5",
    nome: "Flexão",
    intensidade: 3.5,
    descricao:
      "Enim exercitation laborum consectetur incididunt. Incididunt fugiat exercitation pariatur exercitation adipisicing ullamco Lorem amet qui. Pariatur minim officia non esse in dolor commodo aliquip.",
    sessoes: 3,
    repeticoes: 15
  },
  {
    id: "6",
    nome: "Polichinelo",
    intensidade: 1,
    descricao:
      "Magna id consectetur incididunt adipisicing reprehenderit in enim sit in magna. Occaecat esse excepteur veniam incididunt nostrud quis ad voluptate. Magna ullamco eu tempor amet ipsum deserunt. Fugiat laborum sint quis nisi do sit eu dolore enim dolore ipsum dolor ad. Ut fugiat ipsum ipsum officia excepteur. Sint ea elit aliquip exercitation enim. Ea sint id magna sint exercitation ex consectetur culpa deserunt.",
    sessoes: 3,
    repeticoes: 50
  },
];

app.get("/api/exercicios", (req, res, next) => {
  res.status(200).json(exercicios);
});

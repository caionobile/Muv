//verificar essa linha na conexão com banco
const http = require('http');
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

const Exercicio = require("./models/exercicio");
const Treino = require("./models/treino");
const Usuario = require("./models/usuario");

mongoose
  .connect(
    "mongodb+srv://Gabriel:33IVBWfibyvEb2Uq@muv.mk0b2.mongodb.net/site_muv?retryWrites=true&w=majority"
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

const exercicios = [
  {
    id: "1",
    nome: "Abdominal leve",
    intensidade: 2,
    descricao:
      "Deite em uma superfície plana e confortavel; coloque as mãos ao lado do corpo e deixe as pernas levemente flexonadas; agora contraia o abdômem efetuando uma subida do peitoral até os joelhos; repita o movimento pelas repetições indicadas.",
    series: 3,
    repeticoes: 15
  },
  {
    id: "2",
    nome: "Flexão",
    intensidade: 3,
    descricao:
      "Fique de joelhos e apoie as mãos logo abaixo do ombro, levemente abertas; coloque os pés juntos para trás, fique na ponta dos dedos e estique o corpo, deixando as costas retas. Contraindo o abdômen, desca com o tronco até o peitoral encostar no chão ou ficar próximo dele e volte para a posição inicial.",
    series: 3,
    repeticoes: 10
  },
  {
    id: "3",
    nome: "Polichinelo",
    intensidade: 1,
    descricao:
      "Antes de iniciar o movimento é necessário estar de pé, com os braços ao lado do corpo e as pernas fechadas. Logo depois, efetuar um pequeno salto, movendo as mãos acima da cabeça e as pernas se afastando lateralmente. Efetuar outro salto retornando os braços e pernas à posição inicial. Repetir o movimento pelo tempo ou número de repetições programado.",
    series: 3,
    repeticoes: 30
  },
  {
    id: "4",
    nome: "Abdominal",
    intensidade: 3,
    descricao:
      "Deite em uma superfície plana e confortavel; coloque as mãos ao lado do corpo e deixe as pernas levemente flexonadas; agora contraia o abdômem efetuando uma subida do peitoral até os joelhos; repita o movimento pelas repetições indicadas.",
    series: 3,
    repeticoes: 30
  },
  {
    id: "5",
    nome: "Flexão",
    intensidade: 3.5,
    descricao:
      "Fique de joelhos e apoie as mãos logo abaixo do ombro, levemente abertas; coloque os pés juntos para trás, fique na ponta dos dedos e estique o corpo, deixando as costas retas. Contraindo o abdômen, desca com o tronco até o peitoral encostar no chão ou ficar próximo dele e volte para a posição inicial.",
    series: 3,
    repeticoes: 15
  },
  {
    id: "6",
    nome: "Polichinelo",
    intensidade: 1.5,
    descricao:
      "Antes de iniciar o movimento é necessário estar de pé, com os braços ao lado do corpo e as pernas fechadas. Logo depois, efetuar um pequeno salto, movendo as mãos acima da cabeça e as pernas se afastando lateralmente. Efetuar outro salto retornando os braços e pernas à posição inicial. Repetir o movimento pelo tempo ou número de repetições programado.",
    series: 3,
    repeticoes: 50
  },
];

app.get("/api/exercicios", (req, res, next) => {
  res.status(200).json(exercicios);
});

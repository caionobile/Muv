const express = require("express");
const router = express.Router();
const Treino = require("../models/treino");

//Conexão Treino
// router.get("", (req, res, next) => {
//   Treino.find().then((documents) => {
//     console.log(documents);
//     res.status(200).json({
//       mensagem: "Tudo OK",
//       treinos: documents,
//     });
//   });
// });
let exercicio = {
  id: "1",
  nome: "exercicio",
  descricao: "descricao",
  intensidade: 1,
  repeticoes: 2,
  series: 3,
};

let treinos = [
  {
    id: "1",
    nome: "Abdominal Leve",
    posicao: 0,
    exercicios: [
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
    ],
  },
  {
    id: "2",
    nome: "Abdominal Médio",
    posicao: 1,
    exercicios: [
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
    ],
  },
  {
    id: "3",
    nome: "Abdominal Pesado",
    posicao: 2,
    exercicios: [
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
    ],
  },
  {
    id: "4",
    nome: "Flexão Leve",
    posicao: 3,
    exercicios: [
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
    ],
  },
  {
    id: "5",
    nome: "Flexão Médio",
    posicao: 4,
    exercicios: [
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
    ],
  },
  {
    id: "6",
    nome: "Flexão Pesado",
    posicao: 5,
    exercicios: [
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
    ],
  },
  {
    id: "7",
    nome: "Polichinelo Leve",
    posicao: 6,
    exercicios: [
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
    ],
  },
  {
    id: "8",
    nome: "Polichinelo Médio",
    posicao: 7,
    exercicios: [
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
    ],
  },
  {
    id: "9",
    nome: "Polichinelo Pesado",
    posicao: 8,
    exercicios: [
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
    ],
  },
  {
    id: "10",
    nome: "Exercícios para casa",
    posicao: 9,
    exercicios: [
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
      exercicio, exercicio, exercicio, exercicio, exercicio, exercicio,
    ],
  },
];

router.get("", (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    treinos: treinos,
  });
});

router.get("/:id", (req, res, next) => {
  Treino.findById(req.params.id).then((tre) => {
    if (tre) {
      res.status(200).json(tre);
    } else {
      res.status(404).json({ mensagem: "Treino não encontrado!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Treino.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({
      mensagem: "Treino removido",
    });
  });
});

router.put("/:id", (req, res, next) => {
  const treino = new Treino({
    _id: req.params.id,
    nome: req.body.nome,
    posicao: req.body.posicao,
    exercicios: req.body.exercicios,
  });
  Treino.updateOne({ _id: req.params.id }, treino)
    .then((resultado) => {
      console.log(resultado);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
});

router.put("", (req, res, next) => {
  treinos = req.body;
  res.status(200).json({ mensagem: treinos});
});

module.exports = router;

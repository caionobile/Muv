const express = require("express");
const router = express.Router();
const Exercicio = require("../models/exercicio");

//Conexão Exercicios
router.get("/usuario/:id", (req, res, next) => {
  Exercicio.find({assignTo: {'$in': [req.params.id,"60a9542eb4cf3204e4c8d364"]}})
  .then((documents) => {
    res.status(200).json({
      mensagem: "Tudo OK",
      exercicios: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Exercicio.findById(req.params.id).then((exer) => {
    if (exer) {
      res.status(200).json(exer);
    } else {
      res.status(404).json({ mensagem: "Exercicio não encontrado!" });
    }
  });
});

router.post("", (req, res, next) => {
  const exercicio = new Exercicio({
    nome: req.body.nome,
    intensidade: req.body.intensidade,
    descricao: req.body.descricao,
    series: req.body.series,
    repeticoes: req.body.repeticoes,
    assignTo: req.body.assignTo
  });
  exercicio.save().then((exercicioInserido) => {
    res.status(201).json({
      mensagem: "Exercicio inserido",
      exercicio: {
        id: exercicioInserido._id,
        nome: exercicioInserido.nome,
        intensidade: exercicioInserido.intensidade,
        descricao: exercicioInserido.descricao,
        series: exercicioInserido.series,
        repeticoes: exercicioInserido.repeticoes,
        assignTo: exercicioInserido.assignTo,
      },
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Exercicio.deleteOne({ _id: req.params.id }).then((resultado) => {
    res.status(200).json({
      mensagem: "Exercicio removido",
    });
  });
});

router.put("/:id", (req, res, next) => {
  const exercicio = new Exercicio({
    _id: req.params.id,
    nome: req.body.nome,
    intensidade: req.body.intensidade,
    descricao: req.body.descricao,
    series: req.body.series,
    repeticoes: req.body.repeticoes
  });
  Exercicio.updateOne({ _id: req.params.id }, exercicio)
    .then((resultado) => {
      console.log(resultado);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
});

module.exports = router;

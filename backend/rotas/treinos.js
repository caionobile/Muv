const express = require("express");
const router = express.Router();
const Treino = require("../models/treino");

//Conexão Treino
router.get("", (req, res, next) => {
  Treino.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      treinos: documents,
    });
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

module.exports = router;

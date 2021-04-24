const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");

//Conexão Usuario
router.get("", (req, res, next) => {
  Usuario.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      usuarios: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Usuario.findById(req.params.id).then((usu) => {
    if (usu) {
      res.status(200).json(usu);
    } else {
      res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Usuario.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({
      mensagem: "Usuário removido",
    });
  });
});

router.put("/:id", (req, res, next) => {
  const usuario = new Usuario({
    _id: req.params.id,
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha
  });
  Usuario.updateOne({ _id: req.params.id }, usuario)
    .then((resultado) => {
      console.log(resultado);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
});

module.exports = router;

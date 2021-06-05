const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Conexão Usuario
router.get("/:id", (req, res, next) => {
  Usuario.findById(req.params.id).then((usu) => {
    console.log(usu);
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

router.post("/login", (req, res, next) => {
  let user;
  Usuario.findOne({ email: req.body.email })
    .then((u) => {
      user = u;
      console.log(user);
      if (!u) {
        return throwError();
      }
      return bcrypt.compare(req.body.senha, u.senha);
    })
    .then((result) => {
      if (!result) {
        return throwError();
      }
      const token = jwt.sign({ email: user.email, id: user.id }, "minhasenha", {
        expiresIn: "1h",
      });
      res.status(200).json({
        nome: user.nome,
        email: user.email,
        id: user.id,
        token: token,
        expiresIn:3600
      });
    })
    .catch(() => {
      return res.status(401).json({
        mensagem: "Email e/ou senha incorretos",
      });
    });
});

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.senha, 10).then((hash) => {
    const usuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email,
      senha: hash,
    });
    usuario
      .save()
      .then((result) => {
        res.status(201).json({
          mensagem: "Usuario criado",
          resultado: result,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  });
});

module.exports = router;

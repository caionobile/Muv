const express = require("express");
const router = express.Router();
const Treino = require("../models/treino");

//Conexão Treino
router.get("", async (req, res) => {
  try {
    const treino = await Treino.find()
      .populate(["exercicios"])
      .sort({ posicao: 1 });

    return res.send({ treino });
  } catch {
    return res.status(400).send({ error: "Erro ao carregar treinos" });
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const treino = new Treino.findById(req.params.treinoId).populate([
      "exercicios",
    ]);

    return res.send({ treino });
  } catch {
    return res.status(400).send({ error: "Erro ao carregar treino" });
  }
});

router.post("", async (req, res) => {
  try {
    const { nome, posicao, exercicios } = req.body;

    const treino = await Treino.create({ nome, posicao });

    await Promise.all(
      exercicios.map(async (exercicio) => {
        const treinoExercicio = new Exercicio({
          ...exercicios,
          treino: treino._id,
        });

        await treinoExercicio.save();

        treino.exercicios.push(treinoExercicio);
      })
    );

    await treino.save();

    return res.send({ treino });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao criar novo treino" });
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    Treino.findByIdAndDelete(req.params.treinoId);

    return res.send();
  } catch {
    return res.status(400).send({ error: "Erro ao deletar treino" });
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const { nome, posicao, exercicios } = req.body;

    const treino = Treino.findByIdAndUpdate(
      req.params.treinoId,
      { nome, posicao },
      { new: True }
    );

    treino.exercicios = [];

    Exercicio.remove({ treino: treino._id });

    Promise.all(
      exercicios.map(async (exercicio) => {
        const treinoExercicio = new Exercicio({
          ...exercicios,
          treino: treino._id,
        });

        treinoExercicio.save();

        treino.exercicios.push(treinoExercicio);
      })
    );

    treino.save();

    return res.send({ treino });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao atualizar treino" });
  }
});

router.put("", (req, res, next) => {
  try {
    treinos = req.body;
    for (let treino of treinos) {
      Treino.updateOne(
        {_id: treino.id}
        , treino
      ).then();
    }

    res.status(200).json({ mensagem: treinos });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

module.exports = router;

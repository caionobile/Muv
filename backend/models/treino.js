const mongoose = require('mongoose');

const treinoSchema = mongoose.Schema({
  nome: {type: String, required: true},
  posicao: {type: Number, required: true},
  exercicios: {type: Array, required: false}
});

module.exports = mongoose.model('Treino', treinoSchema);
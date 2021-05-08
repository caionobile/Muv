const mongoose = require('mongoose');

const treinoSchema = mongoose.Schema({
  nome: {type: String, required: true},
  posicao: {type: Number, required: true},
  exercicios: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercicio'}],
});

module.exports = mongoose.model('Treino', treinoSchema);
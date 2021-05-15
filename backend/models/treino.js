const mongoose = require('mongoose');

const treinoSchema = mongoose.Schema({
  nome: {type: String, required: true},
  posicao: {type: Number},
  exercicios: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercicio', required: true}],
  assignTo: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true}
});

module.exports = mongoose.model('Treino', treinoSchema);
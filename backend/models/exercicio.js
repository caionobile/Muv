const mongoose = require('mongoose');

const exercicioSchema = mongoose.Schema({
  nome: {type: String, required: true},
  intensidade: {type: Number, required: true},
  descricao: {type: String, required: true},
  series: {type: Number, required: true},
  repeticoes: {type: Number, required: true},
  assignTo: {type: mongoose.Schema.Types.ObjectId, required: false}
});

module.exports = mongoose.model('Exercicio', exercicioSchema);
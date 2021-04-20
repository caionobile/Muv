import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhe-exercicio',
  templateUrl: './detalhe-exercicio.component.html',
  styleUrls: ['./detalhe-exercicio.component.scss'],
})
export class DetalheExercicioComponent implements OnInit {

  detalheExercicio = {
    nome: 'Abdominal leve',
    intensidade: 1,
    descricao:
      'Deitar em cima de um tapete, colocar mãos ao lado do corpo, deixar pernas levemente flexonadas e contrair o abdômem',
    sessoes: 3,
    repeticoes: 15,
  };

  constructor() {}

  ngOnInit(): void {}
}

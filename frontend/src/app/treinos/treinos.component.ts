import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Exercicio } from '../models/exercicio.model';
import { Treino } from '../models/treino.model';
@Component({
  selector: 'app-treinos',
  templateUrl: './treinos.component.html',
  styleUrls: ['./treinos.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class TreinosComponent implements OnInit {

  i: Exercicio = {
    id: '1',
    nome: 'treino',
    descricao: 'descricao',
    intensidade: 1,
    repeticoes: 2,
    series: 3
  };

  exercicios: Exercicio[] = [
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
    this.i,
  ]

  n: Treino = {
    id: '1',
    nome: 'Treino',
    posicao: 1,
    exercicios: this.exercicios,
  }

  treinos: Treino[] = [
    this.n,
    this.n,
    this.n,
    this.n,
    this.n,
    this.n,
    this.n,
    this.n,
    this.n,
    this.n,
    this.n,
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

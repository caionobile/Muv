import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Exercicio } from '../exercicios/exercicio.model';

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

  exercicio: Exercicio = {
    id: '1',
    nome: 'treinos',
    descricao: 'descricao',
    intensidade: 1,
    repeticoes: 2,
    series: 3
  };

  nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  constructor() { }

  ngOnInit(): void {
  }

  flip: string = 'inactive';

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

}

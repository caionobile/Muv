import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Treino } from '../models/treino.model';
import { TreinoService } from '../service/treino.service';

@Component({
  selector: 'app-treinos',
  templateUrl: './treinos.component.html',
  styleUrls: ['./treinos.component.scss'],
})
export class TreinosComponent implements OnInit {
  treinos: Treino[] = [];
  novaOrdem: Treino[];
  private treinosSubscription: Subscription;

  ngOnInit(): void {
  //   let i: Exercicio = {
  //     id: '1',
  //     nome: 'treino',
  //     descricao: 'descricao',
  //     intensidade: 1,
  //     repeticoes: 2,
  //     series: 3,
  //   };

  //   let n: Exercicio[] = [];

  //   for (let j = 0; j < 14; j++) {
  //     n.push(i);
  //   }

  //   let treinosNaoOrdenados: Treino[] = [];

  //   for (let f = 0; f < 20; f++) {
  //     let tf: Treino = {
  //       id: (f + 1).toString(),
  //       nome: 'Treino' + (f + 1).toString(),
  //       posicao: f,
  //       exercicios: n,
  //     };
  //     treinosNaoOrdenados.push(tf);
  //   }

  //   this.treinos = treinosNaoOrdenados.sort((a, b) =>
  //     a.posicao > b.posicao ? 1 : -1
  //   );
  // }

  this.treinoService.getTreinos();
    this.treinosSubscription = this.treinoService
    .getListaDeTreinosAtualizadaObservable()
    .subscribe((treinos: Treino[]) => {
      this.treinos = treinos;
    });
  }

  constructor(public treinoService: TreinoService) {}

  storeNewOrder(event) {
    for (let i = 0; i < event.currentOrder.length; i++) {
      event.currentOrder[i].posicao = i;
    }
    this.novaOrdem = event.currentOrder;
    this.treinoService.atualizarPosicaoDeTreinos(this.novaOrdem)
  }

}

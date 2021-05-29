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
  const idUsuario = localStorage.getItem("id")
  this.treinoService.getTreinos(idUsuario);
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
